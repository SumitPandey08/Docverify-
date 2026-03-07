import { MessagesAnnotation, StateGraph } from "@langchain/langgraph";
import { geminiModel } from "../services/gemini.js";
import { ocrTool } from "../tools/ocrTool.js";
import { pdfParserTool } from "../tools/pdfParser.js";
import { qrScannerTool } from "../tools/qrValidator.js";
import { databaseCheckTool } from "../tools/databaseCheck.js";
import { expiryCheckTool } from "../tools/expiryCheck.js";
import { visualComparatorTool } from "../tools/visualComparator.js";
import { ToolNode } from "@langchain/langgraph/prebuilt";

const tools = [ocrTool, pdfParserTool, qrScannerTool, databaseCheckTool, expiryCheckTool, visualComparatorTool];
const toolNode = new ToolNode(tools);

// Bind tools to the model
const modelWithTools = geminiModel.bindTools(tools);

// Define the function that calls the model
async function callModel(state: typeof MessagesAnnotation.State) {
  const response = await modelWithTools.invoke(state.messages);
  return { messages: [response] };
}

// Define the conditional edge logic
function shouldContinue(state: typeof MessagesAnnotation.State) {
  const lastMessage = state.messages[state.messages.length - 1];
  if (lastMessage && "tool_calls" in lastMessage && Array.isArray(lastMessage.tool_calls) && lastMessage.tool_calls.length > 0) {
    return "tools";
  }
  return "__end__";
}

// Build the graph using MessagesAnnotation which is what ToolNode expects
const workflow = new StateGraph(MessagesAnnotation)
  .addNode("agent", callModel)
  .addNode("tools", toolNode)
  .addEdge("__start__", "agent")
  .addConditionalEdges("agent", shouldContinue)
  .addEdge("tools", "agent");

export const documentAgent = workflow.compile();

/**
 * Helper to run the agent
 */
export const runDocumentAgent = async (filePath: string, modelDocPath?: string, userDataJson?: string, requiredFields?: string) => {
  const currentDate = new Date().toISOString().split('T')[0];
  const initialState = {
    messages: [
      {
        role: "user",
        content: `You are a strict document verification agent. The current date is ${currentDate}.
        
        INPUT DATA:
        - Document Path: "${filePath}"
        ${modelDocPath ? `- Organization's Reference Model Path: "${modelDocPath}"` : ""}
        ${userDataJson ? `- Expected User Data: ${userDataJson}` : ""}
        ${requiredFields ? `- Required Document Fields: ${requiredFields}` : ""}
        
        Follow these steps strictly:
        1. Extract text using the OCR or PDF parser tool depending on the file type.
        2. Analyze the extracted text for an expiration date. If found, use the expiry_check_tool. If expired, STOP immediately.
        3. If a reference model is provided, use visual_comparator_tool to compare the user document against the organization's reference template image.
        4. If required document fields are provided, ensure each field is present, matches the specified type, and passes any validation regex if provided.
        5. If user data is provided, verify the extracted text matches the expected names, ID numbers, etc.
        6. Check for any QR codes or Barcodes using the qr_scanner_tool. This is CRITICAL.
        7. Use the database_check_tool to confirm if the document data exists in official records. 
           - If a QR code was scanned and contains a JSON object with an "id", pass that ID as the "documentId" parameter to the tool.
           - Pass the extracted text (names, serials) as the "query" parameter.
        8. Compare the data found in the QR/Barcode with the printed document text. If they mismatch, flag as TAMPERED.
        9. Provide a final verification summary. You MUST include a line at the very end that strictly says either "FINAL_STATUS: PASSED" or "FINAL_STATUS: FAILED" based on your findings.`,
      },
    ],
  };

  const finalState = await documentAgent.invoke(initialState);
  const lastMessage = finalState.messages[finalState.messages.length - 1];
  
  return lastMessage.content;
};

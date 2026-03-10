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
        content: `You are a sophisticated document verification agent. The current date is ${currentDate}.
        
        INPUT DATA:
        - Document Path: "${filePath}"
        ${modelDocPath ? `- Organization's Reference Model Path: "${modelDocPath}"` : ""}
        ${userDataJson ? `- Expected User Data: ${userDataJson}` : ""}
        ${requiredFields ? `- Required Document Fields: ${requiredFields}` : ""}
        
        STRICT PROTOCOL:
        1. Extract text using OCR or PDF parser.
        2. Check for expiration. If expired, FAIL immediately.
        3. If a reference model exists, use visual_comparator_tool.
        4. Match User Data: Be intelligent. "Sumit Pandey" is a MATCH for "sumit". Do not fail for case sensitivity or missing middle/last names if the primary name matches.
        5. Scan for QR/Barcodes. If found, compare with printed text.
        6. Seal and Signature: Check if the document contains the official organization seal and authorized signature as per the reference model.
        7. Database Check: This is the source of truth. 
           - If you find a "DOCUMENT ID" or "ID" in the text, use it as the "documentId" parameter.
           - If the database returns an "Exact ID Match", this is a VERY strong indicator of authenticity.
        
        DECISION LOGIC:
        - If Database Check is an "Exact ID Match" and data aligns, the document is likely AUTHENTIC even if the QR scanner tool fails (technical glitches happen).
        - Only FAIL if there is a CLEAR evidence of tampering, expiry, or the database says "No Record Found".
        
        VERIFICATION SUMMARY:
        You MUST include a section called "CONFIDENCE_BREAKDOWN" with scores (0-100):
        - Textual_Accuracy (OCR & Intelligent Name Match)
        - Visual_CNN_Match (Structural consistency)
        - Database_Trust (Records verification)
        - Logic_Consistency (Expiry, No Tampering signs)
        
        Provide a "FINAL_CONFIDENCE_SCORE" (0-100).
        
        Finally, include a line at the very end: "FINAL_STATUS: PASSED" or "FINAL_STATUS: FAILED".`,
      },
    ],
  };

  const finalState = await documentAgent.invoke(initialState);
  const lastMessage = finalState.messages[finalState.messages.length - 1];
  
  return lastMessage.content;
};

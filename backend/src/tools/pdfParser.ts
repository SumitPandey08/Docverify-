import { tool } from "@langchain/core/tools";
import fs from "fs";
import { PDFParse } from "pdf-parse";
import { z } from "zod";

export const pdfParserTool = tool(
  async ({ filePath }) => {
    try {
      if (!fs.existsSync(filePath)) {
        return "File not found.";
      }
      const dataBuffer = fs.readFileSync(filePath);
      const data = await PDFParse(dataBuffer);
      return data.text;
    } catch (error: any) {
      return `PDF Parsing Error: ${error.message}`;
    }
  },
  {
    name: "pdf_parser_tool",
    description: "Extract text directly from PDF files.",
    schema: z.object({
      filePath: z.string().describe("The local path to the PDF file."),
    }),
  }
);

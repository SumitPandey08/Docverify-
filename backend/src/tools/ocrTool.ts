import { tool } from "@langchain/core/tools";
import Tesseract from "tesseract.js";
import sharp from "sharp";
import { z } from "zod";

export const ocrTool = tool(
  async ({ filePath }) => {
    try {
      console.log(`--- OCR Tool Processing ---`);
      
      // Pre-process image for better OCR accuracy
      const processedImageBuffer = await sharp(filePath)
        .grayscale() // Remove color noise
        .normalize() // Enhance contrast
        .sharpen()   // Make edges crisper
        .toBuffer();

      const { data } = await Tesseract.recognize(processedImageBuffer, "eng", {
        // logger: m => console.log(m) // Uncomment for debugging
      });
      
      console.log(`OCR Extracted Text Length: ${data.text.length}`);
      return data.text;
    } catch (error: any) {
      console.error(`OCR Error: ${error.message}`);
      return `OCR Error: ${error.message}`;
    }
  },
  {
    name: "ocr_tool",
    description: "Extract text from image files using advanced OCR pre-processing.",
    schema: z.object({
      filePath: z.string().describe("The local path to the image file."),
    }),
  }
);

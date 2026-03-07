import { tool } from "@langchain/core/tools";
import { z } from "zod";
import fs from "fs";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export const visualComparatorTool = tool(
  async ({ userDocPath, modelDocPath }) => {
    try {
      if (!fs.existsSync(userDocPath) || !fs.existsSync(modelDocPath)) {
        return "One or both document paths are invalid.";
      }

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const userDoc = {
        inlineData: {
          data: Buffer.from(fs.readFileSync(userDocPath)).toString("base64"),
          mimeType: "image/jpeg", // Should ideally be dynamic
        },
      };

      const modelDoc = {
        inlineData: {
          data: Buffer.from(fs.readFileSync(modelDocPath)).toString("base64"),
          mimeType: "image/jpeg",
        },
      };

      const prompt = `
        Compare these two images:
        1. User Provided Document
        2. Organization Reference Template
        
        Act as a CNN-based visual verification system. 
        - Check if the layout, structure, and header positions match the template.
        - Look for any visual anomalies or signs of forgery.
        - Confirm if the user document follows the visual 'model' of the organization.
        
        Provide a JSON response with:
        {
          "visualMatchScore": 0-1,
          "anomaliesDetected": string[],
          "isLayoutValid": boolean,
          "reasoning": string
        }
      `;

      const result = await model.generateContent([prompt, userDoc, modelDoc]);
      return result.response.text();
    } catch (error: any) {
      return `Visual Comparison Error: ${error.message}`;
    }
  },
  {
    name: "visual_comparator_tool",
    description: "Compare the user's document visually against a reference model template image.",
    schema: z.object({
      userDocPath: z.string().describe("Path to the document provided by the user."),
      modelDocPath: z.string().describe("Path to the organization's reference model image."),
    }),
  }
);

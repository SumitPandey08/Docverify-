import { tool } from "@langchain/core/tools";
import { z } from "zod";

export const expiryCheckTool = tool(
  async ({ expiryDateString }) => {
    const expiryDate = new Date(expiryDateString);
    const currentDate = new Date();
    
    // Reset times to compare just the dates
    currentDate.setHours(0, 0, 0, 0);
    expiryDate.setHours(0, 0, 0, 0);

    if (isNaN(expiryDate.getTime())) {
      return JSON.stringify({ 
        error: true, 
        message: "Could not parse the provided date. Please verify the format." 
      });
    }

    if (expiryDate < currentDate) {
      return JSON.stringify({ 
        isExpired: true, 
        message: `Document expired on ${expiryDate.toISOString().split('T')[0]}. Processing should be stopped.` 
      });
    } else {
      return JSON.stringify({ 
        isExpired: false, 
        message: `Document is valid until ${expiryDate.toISOString().split('T')[0]}. Safe to proceed.` 
      });
    }
  },
  {
    name: "expiry_check_tool",
    description: "Evaluate if an extracted expiration date indicates the document is expired compared to today.",
    schema: z.object({
      expiryDateString: z.string().describe("The exact expiration date string found in the document text."),
    }),
  }
);

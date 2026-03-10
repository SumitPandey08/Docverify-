import { tool } from "@langchain/core/tools";
import { z } from "zod";
import fs from "fs";
import sharp from "sharp";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";

export const visualComparatorTool = tool(
  async ({ userDocPath, modelDocPath }) => {
    try {
      console.log(`--- Local Pixel-Matching Visual Comparator ---`);
      if (!fs.existsSync(userDocPath) || !fs.existsSync(modelDocPath)) {
        return "One or both document paths are invalid.";
      }

      // 1. Normalize images using sharp (Resize to same dimensions, same colorspace)
      const width = 1000;
      const height = 1000;

      const img1Buffer = await sharp(userDocPath)
        .resize(width, height, { fit: 'fill' })
        .ensureAlpha()
        .png()
        .toBuffer();

      const img2Buffer = await sharp(modelDocPath)
        .resize(width, height, { fit: 'fill' })
        .ensureAlpha()
        .png()
        .toBuffer();

      // 2. Decode PNGs
      const img1 = PNG.sync.read(img1Buffer);
      const img2 = PNG.sync.read(img2Buffer);
      const diff = new PNG({ width, height });

      // 3. Compare using pixelmatch
      // threshold: 0.1 (low tolerance for mismatch)
      const numDiffPixels = pixelmatch(
        img1.data,
        img2.data,
        diff.data,
        width,
        height,
        { threshold: 0.1 }
      );

      const totalPixels = width * height;
      const matchScore = (totalPixels - numDiffPixels) / totalPixels;
      const isLayoutValid = matchScore > 0.75; // Threshold for validity

      const result = {
        visualMatchScore: matchScore,
        anomaliesDetected: numDiffPixels > totalPixels * 0.25 ? ["Significant structural deviation detected."] : [],
        isLayoutValid: isLayoutValid,
        reasoning: `Matched ${((matchScore) * 100).toFixed(2)}% of layout pixels against the organization template. ${isLayoutValid ? "Structure is consistent." : "Structure deviates too much from template."}`
      };

      console.log(`Visual Match Result: ${result.reasoning}`);
      return JSON.stringify(result);
    } catch (error: any) {
      console.error(`Visual Comparison Error: ${error.message}`);
      return `Visual Comparison Error: ${error.message}`;
    }
  },
  {
    name: "visual_comparator_tool",
    description: "Compare the user's document visually against a reference model template image using pixel-level structural analysis.",
    schema: z.object({
      userDocPath: z.string().describe("Path to the document provided by the user."),
      modelDocPath: z.string().describe("Path to the organization's reference model image."),
    }),
  }
);

import { tool } from "@langchain/core/tools";
import sharp from "sharp";
import { z } from "zod";
import jsQR from "jsqr";
import { 
  MultiFormatReader, 
  BinaryBitmap, 
  HybridBinarizer, 
  GlobalHistogramBinarizer,
  RGBLuminanceSource,
  DecodeHintType,
  BarcodeFormat
} from "@zxing/library";

const scanBuffer = async (buffer: Buffer, width: number, height: number) => {
  try {
    // 1. Try jsQR first (Highly robust for QR codes)
    const code = jsQR(new Uint8ClampedArray(buffer), width, height, {
      inversionAttempts: "attemptBoth",
    });
    
    if (code) {
      return { format: "QR_CODE", text: code.data };
    }

    // 2. Fallback to ZXing (Supports multiple barcode formats)
    // ZXing RGBLuminanceSource expects an Int32Array of ARGB pixels
    const pixelArray = new Int32Array(width * height);
    for (let i = 0; i < pixelArray.length; i++) {
      const r = buffer[i * 4];
      const g = buffer[i * 4 + 1];
      const b = buffer[i * 4 + 2];
      // ARGB format: (A << 24) | (R << 16) | (G << 8) | b;
      pixelArray[i] = (255 << 24) | (r << 16) | (g << 8) | b;
    }

    const luminanceSource = new RGBLuminanceSource(pixelArray, width, height);
    
    // Try both binarizers
    const binarizers = [
      new HybridBinarizer(luminanceSource),
      new GlobalHistogramBinarizer(luminanceSource)
    ];

    const hints = new Map();
    hints.set(DecodeHintType.POSSIBLE_FORMATS, [
      BarcodeFormat.QR_CODE,
      BarcodeFormat.CODE_128,
      BarcodeFormat.CODE_39,
      BarcodeFormat.EAN_13,
      BarcodeFormat.PDF_417,
      BarcodeFormat.DATA_MATRIX
    ]);
    hints.set(DecodeHintType.TRY_HARDER, true);

    const reader = new MultiFormatReader();
    reader.setHints(hints);

    for (const binarizer of binarizers) {
      try {
        const binaryBitmap = new BinaryBitmap(binarizer);
        const result = reader.decode(binaryBitmap);
        if (result) {
          return { format: result.getBarcodeFormat().toString(), text: result.getText() };
        }
      } catch (e) {
        // Continue to next binarizer
      }
    }

    return null;
  } catch (err) {
    return null;
  }
};

export const qrScannerTool = tool(
  async ({ filePath }) => {
    try {
      console.log(`--- Ultra-Robust Multi-Pass QR/Barcode Scanner Tool ---`);
      
      const baseSharp = sharp(filePath);
      
      // Define passes: [name, processor]
      // We use a variety of transforms to catch QR codes in any condition
      const passes: [string, (s: sharp.Sharp) => sharp.Sharp][] = [
        ["Original-Native", (s) => s], // No resizing, use as-is
        ["Original-Resized", (s) => s.resize(2000, 2000, { fit: 'inside', withoutEnlargement: true })],
        ["Grayscale-HighContrast", (s) => s.resize(2000, 2000, { fit: 'inside' }).grayscale().linear(1.5, -0.2)], 
        ["Inverted", (s) => s.resize(2000, 2000, { fit: 'inside' }).grayscale().negate()],
        ["Sharpened", (s) => s.resize(2000, 2000, { fit: 'inside' }).sharpen()],
        ["Small-Scan", (s) => s.resize(1000, 1000, { fit: 'inside' }).grayscale()], 
        ["Ultra-HighRes", (s) => s.resize(4000, 4000, { fit: 'inside' }).grayscale().sharpen()],
      ];

      for (const [passName, processor] of passes) {
        console.log(`Running Scan Pass: ${passName}`);
        const { data, info } = await processor(baseSharp.clone())
          .ensureAlpha()
          .raw()
          .toBuffer({ resolveWithObject: true });

        const result = await scanBuffer(data, info.width, info.height);
        
        if (result) {
          console.log(`Scan Success in Pass [${passName}]: ${result.format}`);
          return `Scan Success: 
Format: ${result.format}
Data: ${result.text}`;
        }
      }

      console.log("No QR/Barcode detected after 7 aggressive passes.");
      return "No QR code or Barcode found. If the document has one, try providing a higher resolution image with better lighting.";
    } catch (error: any) {
      console.error(`Scanning Error: ${error.message}`);
      return `Scanning Error: ${error.message}`;
    }
  },
  {
    name: "qr_scanner_tool",
    description: "Scan QR codes and various Barcode formats from image files using ultra-robust multi-pass preprocessing.",
    schema: z.object({
      filePath: z.string().describe("The local path to the image file to scan."),
    }),
  }
);

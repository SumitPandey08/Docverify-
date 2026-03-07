import { tool } from "@langchain/core/tools";
import sharp from "sharp";
import { z } from "zod";
import { 
  MultiFormatReader, 
  BinaryBitmap, 
  HybridBinarizer, 
  RGBLuminanceSource,
  DecodeHintType,
  BarcodeFormat
} from "@zxing/library";

export const qrScannerTool = tool(
  async ({ filePath }) => {
    try {
      console.log(`--- QR/Barcode Scanner Tool ---`);
      const { data, info } = await sharp(filePath)
        .resize(2000, 2000, { fit: 'inside', withoutEnlargement: true }) // Larger resize for better detail
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });

      const pixelArray = new Int32Array(info.width * info.height);
      for (let i = 0; i < pixelArray.length; i++) {
        const r = data[i * 4];
        const g = data[i * 4 + 1];
        const b = data[i * 4 + 2];
        pixelArray[i] = (255 << 24) | (r << 16) | (g << 8) | b;
      }

      const luminanceSource = new RGBLuminanceSource(
        pixelArray,
        info.width,
        info.height
      );
      const binaryBitmap = new BinaryBitmap(new HybridBinarizer(luminanceSource));

      const hints = new Map();
      const formats = [
        BarcodeFormat.QR_CODE,
        BarcodeFormat.CODE_128,
        BarcodeFormat.CODE_39,
        BarcodeFormat.EAN_13,
        BarcodeFormat.PDF_417,
        BarcodeFormat.DATA_MATRIX
      ];
      hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);
      hints.set(DecodeHintType.TRY_HARDER, true);

      const reader = new MultiFormatReader();
      reader.setHints(hints);

      try {
        const result = reader.decode(binaryBitmap);
        if (result) {
          console.log(`Scan Success: ${result.getBarcodeFormat()}`);
          return `Scan Success: 
Format: ${result.getBarcodeFormat()}
Data: ${result.getText()}`;
        }
      } catch (err) {
        return "No QR code or Barcode found. If the document has one, try a clearer or higher resolution upload.";
      }

      return "No QR code or Barcode found.";
    } catch (error: any) {
      return `Scanning Error: ${error.message}`;
    }
  },
  {
    name: "qr_scanner_tool",
    description: "Scan QR codes and various Barcode formats from image files.",
    schema: z.object({
      filePath: z.string().describe("The local path to the image file to scan."),
    }),
  }
);

import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import QRCode from 'qrcode';

interface IFieldToDraw {
  label?: string;
  text: string;
  x?: number;
  y?: number;
  fontSize?: number;
  color?: string;
  align?: 'left' | 'center' | 'right';
}

/**
 * Generates a professionally aligned document with a robust auto-layout algorithm.
 * Optimized for both tiny (ID cards) and large (Certificates) templates.
 */
export const generateDocumentImage = async (
  templatePath: string,
  fields: IFieldToDraw[],
  outputPath: string,
  qrData: string,
  options: { issuerName?: string; documentTitle?: string } = {}
) => {
  console.log(`--- Generating Robust Auto-Aligned Document ---`);
  
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template image not found at ${templatePath}`);
  }

  // 1. Prepare Base Image (Solidify Orientation and Dimensions)
  const baseImageBuffer = await sharp(templatePath).rotate().toBuffer();
  const baseMeta = await sharp(baseImageBuffer).metadata();
  const width = baseMeta.width || 1000;
  const height = baseMeta.height || 1000;
  console.log(`Target Resolution: ${width}x${height}`);

  // 2. Adaptive Scaling
  const minDim = Math.min(width, height);
  const scale = minDim / 400; // Relative to a small ID card size
  
  const qrSize = Math.floor(minDim * 0.25);
  const marginX = Math.floor(width * 0.08);
  const marginY = Math.floor(height * 0.08);

  // 3. Create SVG Overlay
  let currentY = marginY;
  let svgContent = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">`;
  
  const szTitle = Math.max(12, Math.floor(24 * scale));
  const szIssuer = Math.max(10, Math.floor(14 * scale));
  const szLabel = Math.max(8, Math.floor(11 * scale));
  const szValue = Math.max(10, Math.floor(13 * scale));
  const szMeta = Math.max(7, Math.floor(8 * scale));

  svgContent += `
    <style>
      .title { font-family: sans-serif; font-size: ${szTitle}px; font-weight: 800; fill: #000; text-transform: uppercase; }
      .issuer { font-family: sans-serif; font-size: ${szIssuer}px; fill: #444; letter-spacing: 1px; }
      .label { font-family: sans-serif; font-size: ${szLabel}px; fill: #777; font-weight: normal; }
      .value { font-family: sans-serif; font-size: ${szValue}px; fill: #000; font-weight: bold; }
      .meta { font-family: monospace; font-size: ${szMeta}px; fill: #999; }
      .divider { stroke: #DDD; stroke-width: 1; }
    </style>`;

  // Header
  if (options.issuerName) {
    svgContent += `<text x="${width / 2}" y="${currentY}" text-anchor="middle" dominant-baseline="hanging" class="issuer">${options.issuerName.toUpperCase()}</text>`;
    currentY += Math.floor(szIssuer * 1.5);
  }
  
  if (options.documentTitle) {
    svgContent += `<text x="${width / 2}" y="${currentY}" text-anchor="middle" dominant-baseline="hanging" class="title">${options.documentTitle}</text>`;
    currentY += Math.floor(szTitle * 1.3);
    svgContent += `<line x1="${marginX}" y1="${currentY}" x2="${width - marginX}" y2="${currentY}" class="divider" />`;
    currentY += Math.floor(szTitle * 0.5);
  }

  // Content (Group User vs Meta)
  const metaLabels = ['Document ID', 'Issue Date', 'Expiry Date'];
  const userFields = fields.filter(f => !metaLabels.includes(f.label || ''));
  const metaFields = fields.filter(f => metaLabels.includes(f.label || ''));

  for (const field of userFields) {
    svgContent += `
      <text x="${marginX}" y="${currentY}" dominant-baseline="hanging" class="label">${(field.label || '').toUpperCase()}</text>
      <text x="${marginX}" y="${currentY + szLabel + 1}" dominant-baseline="hanging" class="value">${field.text}</text>`;
    currentY += Math.floor((szLabel + szValue) * 1.5);
  }

  // Footer / Metadata
  let footerY = height - marginY - qrSize - (metaFields.length * szMeta * 1.5);
  footerY = Math.max(footerY, currentY + 10); // Don't overlap content

  for (const field of metaFields) {
    svgContent += `<text x="${marginX}" y="${footerY}" dominant-baseline="hanging" class="meta">${field.label}: ${field.text}</text>`;
    footerY += Math.floor(szMeta * 1.5);
  }

  svgContent += '</svg>';

  // 4. Rasterize Overlays with EXPLICIT Size Control
  const textOverlay = await sharp(Buffer.from(svgContent))
    .resize(width, height)
    .png()
    .toBuffer();

  const qrRawBuffer = await QRCode.toBuffer(qrData, { 
    margin: 1, 
    width: qrSize, 
    errorCorrectionLevel: 'M' 
  });
  
  // Force QR to exact size
  const qrOverlay = await sharp(qrRawBuffer)
    .resize(qrSize, qrSize)
    .toBuffer();

  // 5. Final Safe Composite
  const qrTop = Math.floor(Math.min(height - qrSize - marginY, height - qrSize));
  const qrLeft = Math.floor(Math.min(width - qrSize - marginX, width - qrSize));

  await sharp(baseImageBuffer)
    .composite([
      { input: textOverlay, top: 0, left: 0 },
      { input: qrOverlay, top: Math.max(0, qrTop), left: Math.max(0, qrLeft) }
    ])
    .png()
    .toFile(outputPath);

  console.log(`Document success: ${outputPath}`);
  return outputPath;
};

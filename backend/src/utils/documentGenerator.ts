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
 * Now features grid layouts, watermarks, and elegant typography.
 */
export const generateDocumentImage = async (
  templatePath: string,
  fields: IFieldToDraw[],
  outputPath: string,
  qrData: string,
  options: { issuerName?: string; documentTitle?: string } = {}
) => {
  console.log(`--- Generating Premium Auto-Aligned Document ---`);
  
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template image not found at ${templatePath}`);
  }

  // 1. Prepare Base Image (Solidify Orientation and Dimensions)
  let transformer = sharp(templatePath).rotate();
  let baseMeta = await transformer.metadata();
  
  let width = baseMeta.width || 1000;
  let height = baseMeta.height || 1000;

  // Enforce a minimum high-quality resolution (e.g., 2000px width)
  const minTargetWidth = 2000;
  if (width < minTargetWidth) {
    const scaleFactor = minTargetWidth / width;
    width = Math.round(width * scaleFactor);
    height = Math.round(height * scaleFactor);
    transformer = transformer.resize(width, height, {
      kernel: sharp.kernel.lanczos3,
      withoutEnlargement: false
    });
  }

  const baseImageBuffer = await transformer.toBuffer();
  console.log(`Target Resolution: ${width}x${height} (Original was ${baseMeta.width}x${baseMeta.height})`);

  // 2. Adaptive Scaling
  const minDim = Math.min(width, height);
  const scale = minDim / 400; // Relative to a small ID card size
  
  const qrSize = Math.floor(minDim * 0.22); // Slightly smaller QR for better balance
  const marginX = Math.floor(width * 0.08);
  const marginY = Math.floor(height * 0.08);

  // 3. Create SVG Overlay
  let svgContent = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">`;
  
  const szTitle = Math.max(16, Math.floor(28 * scale));
  const szIssuer = Math.max(12, Math.floor(18 * scale));
  const szLabel = Math.max(9, Math.floor(12 * scale));
  const szValue = Math.max(11, Math.floor(15 * scale));
  const szMeta = Math.max(8, Math.floor(10 * scale));
  const watermarkSize = Math.floor(minDim * 0.15);

  svgContent += `
    <defs>
      <linearGradient id="headerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#1A2980" stop-opacity="0.9" />
        <stop offset="100%" stop-color="#26D0CE" stop-opacity="0.9" />
      </linearGradient>
    </defs>
    <style>
      .watermark { font-family: 'Times New Roman', serif; font-size: ${watermarkSize}px; fill: rgba(0,0,0,0.04); font-weight: bold; text-transform: uppercase; }
      .header-bg { fill: url(#headerGrad); }
      .header-title { font-family: 'Georgia', serif; font-size: ${szTitle}px; font-weight: 900; fill: #FFFFFF; text-transform: uppercase; letter-spacing: 2px; }
      .header-issuer { font-family: 'Arial', sans-serif; font-size: ${szIssuer}px; fill: #E0E0E0; letter-spacing: 3px; font-weight: 600; }
      .label { font-family: 'Arial', sans-serif; font-size: ${szLabel}px; fill: #555555; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
      .value { font-family: 'Times New Roman', serif; font-size: ${szValue}px; fill: #111111; font-weight: 700; }
      .meta-label { font-family: 'Arial', sans-serif; font-size: ${szMeta}px; fill: #777777; font-weight: bold; }
      .meta-value { font-family: 'Courier New', monospace; font-size: ${szMeta}px; fill: #333333; }
      .divider { stroke: #CCCCCC; stroke-width: 2; stroke-dasharray: 4, 4; }
      .border-frame { stroke: #1A2980; stroke-width: 4; fill: none; opacity: 0.1; }
      .inner-frame { stroke: #26D0CE; stroke-width: 1; fill: none; opacity: 0.3; }
    </style>`;

  // Draw sophisticated frames
  svgContent += `<rect x="${marginX/2}" y="${marginY/2}" width="${width - marginX}" height="${height - marginY}" class="border-frame" rx="10" ry="10" />`;
  svgContent += `<rect x="${(marginX/2) + 8}" y="${(marginY/2) + 8}" width="${width - marginX - 16}" height="${height - marginY - 16}" class="inner-frame" rx="6" ry="6" />`;

  // Draw Watermark
  const watermarkText = (options.issuerName || "VERIFIED DOCUMENT").toUpperCase();
  svgContent += `<text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" transform="rotate(-30, ${width/2}, ${height/2})" class="watermark">${watermarkText}</text>`;

  let currentY = marginY;

  // Header Banner
  const headerHeight = Math.floor(szTitle * 1.5 + szIssuer * 2.5);
  svgContent += `<rect x="0" y="${currentY}" width="${width}" height="${headerHeight}" class="header-bg" />`;
  
  if (options.issuerName) {
    currentY += Math.floor(szIssuer * 1.5);
    svgContent += `<text x="${width / 2}" y="${currentY}" text-anchor="middle" dominant-baseline="hanging" class="header-issuer">${options.issuerName.toUpperCase()}</text>`;
    currentY += Math.floor(szIssuer * 1.2);
  } else {
    currentY += Math.floor(szIssuer * 1.5);
  }
  
  if (options.documentTitle) {
    svgContent += `<text x="${width / 2}" y="${currentY}" text-anchor="middle" dominant-baseline="hanging" class="header-title">${options.documentTitle}</text>`;
  }
  
  currentY += Math.floor(szTitle * 2.0); // Move below the header banner
  currentY += Math.floor(szTitle * 0.5); // Add spacing

  // Content (Group User vs Meta)
  const metaLabels = ['Document ID', 'Issue Date', 'Expiry Date'];
  const userFields = fields.filter(f => !metaLabels.includes(f.label || ''));
  const metaFields = fields.filter(f => metaLabels.includes(f.label || ''));

  // Draw User Fields in a Two-Column Grid if there are enough fields
  const maxContentWidth = width - (marginX * 2);
  const columnWidth = Math.floor(maxContentWidth / 2) - marginX;
  const col1X = marginX;
  const col2X = marginX + columnWidth + (marginX * 0.5); // Gap between columns
  
  const useGrid = userFields.length > 3 && width > height * 0.8; // Use grid if >3 fields and orientation allows
  const rowHeight = Math.floor((szLabel + szValue) * 1.8);

  for (let i = 0; i < userFields.length; i++) {
    const field = userFields[i];
    const isCol2 = useGrid && i % 2 !== 0;
    const xPos = isCol2 ? col2X : col1X;
    
    // Draw label
    svgContent += `<text x="${xPos}" y="${currentY}" dominant-baseline="hanging" class="label">${(field.label || '').toUpperCase()}</text>`;
    // Draw value
    svgContent += `<text x="${xPos}" y="${currentY + szLabel + 4}" dominant-baseline="hanging" class="value">${field.text}</text>`;
    
    // Only increment Y if we are not using grid OR if it's the right column OR it's the last element and in left col
    if (!useGrid || isCol2 || i === userFields.length - 1) {
      currentY += rowHeight;
      // Add subtle divider between rows
      svgContent += `<line x1="${marginX}" y1="${currentY - (rowHeight * 0.1)}" x2="${width - marginX}" y2="${currentY - (rowHeight * 0.1)}" class="divider" />`;
    }
  }

  currentY += Math.floor(rowHeight * 0.5);

  // Footer / Metadata Section
  // Ensure footer doesn't overlap the QR code by pushing it above the QR section
  let footerY = height - marginY - qrSize - (metaFields.length * szMeta * 1.8);
  
  // Safety check to prevent overlap with user content
  if (footerY < currentY + szTitle) {
      footerY = currentY + szTitle; // Push footer down if it overlaps (though it might overlap QR in extreme cases)
  }

  // Draw Meta Fields
  for (const field of metaFields) {
    svgContent += `<text x="${marginX}" y="${footerY}" dominant-baseline="hanging"><tspan class="meta-label">${(field.label || '').toUpperCase()}: </tspan><tspan class="meta-value">${field.text}</tspan></text>`;
    footerY += Math.floor(szMeta * 1.8);
  }

  svgContent += '</svg>';

  // 4. Rasterize Overlays with HIGH density for extreme sharpness
  const textOverlay = await sharp(Buffer.from(svgContent), { density: 300 })
    .resize(width, height)
    .png()
    .toBuffer();

  // Draw QR Code
  const qrRawBuffer = await QRCode.toBuffer(qrData, { 
    margin: 2, // Slight margin to give it a clean border 
    width: qrSize, 
    errorCorrectionLevel: 'H',
    color: {
      dark: '#111111',  // Near black
      light: '#FFFFFF' // White background
    }
  });
  
  const qrOverlay = await sharp(qrRawBuffer).toBuffer();

  // 5. Final Safe Composite
  // Place QR code in the bottom right corner
  const qrTop = Math.floor(height - qrSize - marginY);
  const qrLeft = Math.floor(width - qrSize - marginX);

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

 import { Request, Response } from 'express';
import { DocumentCreationRequest } from '../models/DocumentCreationRequest.js';
import { Organization } from '../models/Organization.js';
import { generateDocumentImage } from '../utils/documentGenerator.js';
import path from 'path';
import fs from 'fs';

/**
 * User applies for a new document from an organization.
 */
export const applyForDocument = async (req: Request, res: Response) => {
  try {
    const { userId, organizationId, documentModelName, formData } = req.body;
    console.log('--- Document Application Received ---');
    console.log('Data:', { userId, organizationId, documentModelName, formData });

    if (!userId || !organizationId || !documentModelName || !formData) {
      console.error('Error: Missing required application fields');
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const request = new DocumentCreationRequest({
      userId,
      organizationId,
      documentModelName,
      formData,
      status: 'pending'
    });

    await request.save();
    console.log('Application saved successfully with ID:', request._id);
    res.status(201).json(request);
  } catch (error: any) {
    console.error('CRITICAL Error in applyForDocument:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Organization lists all pending document creation requests.
 */
export const getApplications = async (req: Request, res: Response) => {
  try {
    const { organizationId } = req.params;
    const requests = await DocumentCreationRequest.find({ organizationId }).populate('userId');
    res.json(requests);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Organization approves and generates the document.
 */
export const approveAndCreateDocument = async (req: Request, res: Response) => {
  try {
    const { requestId } = req.params;
    console.log(`--- Approving Document Request: ${requestId} ---`);

    const request = await DocumentCreationRequest.findById(requestId);
    if (!request) return res.status(404).json({ error: 'Request not found' });

    const organization = await Organization.findById(request.organizationId);
    if (!organization) return res.status(404).json({ error: 'Organization not found' });

    // Robust matching for model name (trimming whitespace)
    const docModel = organization.documentModels.find(m => 
      m.name.trim() === request.documentModelName.trim()
    );

    if (!docModel || !docModel.modelImagePath) {
      console.error(`Error: Model "${request.documentModelName}" not found or has no image.`);
      return res.status(400).json({ error: 'Document model or template image not found' });
    }

    // Prepare fields for the generator
    console.log('Mapping fields for auto-layout...');
    
    // Map all form data fields
    const fieldsToDraw = Object.entries(request.formData).map(([name, value]) => ({
      label: name,
      text: String(value)
    }));

    // Metadata
    const issueDateStr = new Date().toISOString().split('T')[0];
    let expiryDateStr = 'N/A';
    if (docModel.validityDays) {
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + docModel.validityDays);
      expiryDateStr = expiryDate.toISOString().split('T')[0];
    }

    // Add critical metadata to the list (generator handles placement)
    fieldsToDraw.push(
      { label: 'Document ID', text: String(request._id) },
      { label: 'Issue Date', text: issueDateStr },
      { label: 'Expiry Date', text: expiryDateStr }
    );

    const outputFilename = `generated-${request._id}-${Date.now()}.png`;
    const outputPath = path.join('uploads', outputFilename);

    // QR Data
    const qrData = JSON.stringify({
      id: request._id,
      issuer: organization.name,
      issueDate: issueDateStr,
      expiryDate: expiryDateStr,
      data: request.formData
    });

    // Use auto-layout with issuer and title
    await generateDocumentImage(
      docModel.modelImagePath, 
      fieldsToDraw, 
      outputPath, 
      qrData,
      { 
        issuerName: organization.name, 
        documentTitle: docModel.name,
        sealPath: organization.sealUrl,
        signaturePath: organization.signatureUrl
      }
    );

    request.status = 'created';
    request.generatedDocumentPath = outputPath;
    await request.save();

    console.log('Document creation finalized.');
    res.json({ message: 'Document created successfully', request });
  } catch (error: any) {
    console.error('CRITICAL Error generating document:', error);
    res.status(500).json({ error: error.message });
  }
};

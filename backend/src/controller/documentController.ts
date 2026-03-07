import { Request, Response } from 'express';
import { runDocumentAgent } from '../agent/documentAgent.js';
import { Organization } from '../models/Organization.js';
import { User, VerificationRequest } from '../models/User.js';
import mongoose from 'mongoose';

export const verifyDocument = async (req: Request, res: Response) => {
  console.log('--- Document Verification Started ---');
  try {
    const { userId, organizationId, documentType } = req.body;
    console.log('Params received:', { userId, organizationId, documentType });

    if (!req.file) {
      console.error('Error: No document uploaded.');
      return res.status(400).json({ error: 'No document uploaded.' });
    }

    if (!userId || !organizationId || !documentType) {
      console.error('Error: Missing required fields in body.');
      return res.status(400).json({ error: 'Missing userId, organizationId, or documentType.' });
    }

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(organizationId)) {
      console.error('Error: Invalid ID format.');
      return res.status(400).json({ error: 'Invalid User ID or Organization ID format.' });
    }

    // 1. Fetch Organization and the specific document model/template
    console.log('Fetching Organization:', organizationId);
    const org = await Organization.findById(organizationId);
    if (!org) {
      console.error('Error: Organization not found in DB.');
      return res.status(404).json({ error: 'Organization not found.' });
    }

    const docModel = org.documentModels.find(m => m.name === documentType);
    const modelImagePath = docModel?.modelImagePath;
    const requiredFields = docModel?.fields ? JSON.stringify(docModel.fields) : undefined;

    // 2. Fetch User Data
    console.log('Fetching User:', userId);
    const user = await User.findById(userId);
    const userDataJson = user ? JSON.stringify({
      fullName: user.fullName,
      email: user.email,
      personalIdNumber: user.personalIdNumber
    }) : undefined;

    // 3. Run the LangGraph Agent or Mock
    const filePath = req.file.path;
    console.log('Running AI Agent on file:', filePath);
    
    let result;
    const isMock = process.env.MOCK_VERIFICATION === 'true';
    
    if (isMock) {
      console.log('--- MOCK VERIFICATION ENABLED ---');
      result = "FINAL_STATUS: PASSED (MOCK)";
    } else {
      try {
        result = await runDocumentAgent(filePath, modelImagePath, userDataJson, requiredFields);
        console.log('AI Agent Response successful.');
      } catch (agentError: any) {
        console.error('AI Agent Failure:', agentError.message);
        return res.status(500).json({ error: 'AI Agent failed to process document.', details: agentError.message });
      }
    }

    // 4. Save the Verification Request to DB
    console.log('Saving verification results to database...');
    const aiResponse = String(result).toUpperCase();
    
    // Logic: Default to rejected if AI says FAILED, FRAUD, TAMPERED, or EXPIRED.
    let status: 'verified' | 'rejected' = 'verified';
    if (
      aiResponse.includes("FAILED") || 
      aiResponse.includes("FRAUD") || 
      aiResponse.includes("TAMPERED") || 
      aiResponse.includes("EXPIRED") || 
      aiResponse.includes("INVALID") ||
      aiResponse.includes("REJECTED")
    ) {
      status = 'rejected';
    }

    const verificationRequest = new VerificationRequest({
      userId,
      organizationId,
      documentType,
      filePath,
      status,
      verificationResults: { rawResult: result }
    });

    await verificationRequest.save();
    console.log('Verification Request saved with ID:', verificationRequest._id, 'Status:', status);

    res.json({ 
      verificationId: verificationRequest._id,
      status: verificationRequest.status,
      analysis: result 
    });
  } catch (error: any) {
    console.error('CRITICAL Error during document verification:', error);
    res.status(500).json({ 
      error: 'Internal Server Error', 
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

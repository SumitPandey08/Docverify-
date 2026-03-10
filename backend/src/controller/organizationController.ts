import { Request, Response } from 'express';
import { Organization } from '../models/Organization.js';
import { User, VerificationRequest } from '../models/User.js';
import { DocumentCreationRequest } from '../models/DocumentCreationRequest.js';
import { v4 as uuidv4 } from 'uuid';

export const createOrganization = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    console.log('Creating organization:', { name, email });
    const apiKey = `sk_${uuidv4().replace(/-/g, '')}`;

    const org = new Organization({
      name,
      email,
      password,
      apiKey,
      documentModels: []
    });
    
    await org.save();
    console.log('Organization created successfully');
    res.status(201).json(org);
  } catch (error: any) {
    console.error('Error in createOrganization:', error);
    res.status(500).json({ error: error.message });
  }
};

export const listOrganizations = async (req: Request, res: Response) => {
  try {
    const orgs = await Organization.find({}, 'name email documentModels');
    res.json(orgs);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const loginOrganization = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log('Org login attempt:', email);
    const org = await Organization.findOne({ email });
    
    if (!org) {
      console.warn('Org not found:', email);
      return res.status(404).json({ error: "Organization not found" });
    }
    
    res.json({
      message: "Login successful",
      organization: org,
      token: "mock-jwt-token"
    });
  } catch (error: any) {
    console.error('Error in loginOrganization:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getOrganizationDashboard = async (req: Request, res: Response) => {
  try {
    const { orgId } = req.params;
    const org = await Organization.findById(orgId);
    if (!org) return res.status(404).json({ error: "Organization not found" });

    const requests = await VerificationRequest.find({ organizationId: orgId }).limit(10).sort({ createdAt: -1 });
    const totalVerifications = await VerificationRequest.countDocuments({ organizationId: orgId });
    const fraudDetected = await VerificationRequest.countDocuments({ organizationId: orgId, status: 'rejected' });

    res.json({
      organization: org,
      stats: {
        totalVerifications,
        fraudDetected,
        activeModels: org.documentModels.length,
        apiRequests: totalVerifications * 5 // Mock multiplier
      },
      recentActivity: requests
    });
  } catch (error: any) {
    console.error('Error in getOrganizationDashboard:', error);
    res.status(500).json({ error: error.message });
  }
};
export const addDocumentModel = async (req: Request, res: Response) => {
  try {
    const { orgId } = req.params;
    const { name, fields, validityDays } = req.body;
    const modelImagePath = req.file?.path;

    const org = await Organization.findById(orgId);
    if (!org) return res.status(404).json({ error: "Organization not found" });

    // Parse fields if they are sent as a string (JSON)
    const rawFields = typeof fields === 'string' ? JSON.parse(fields) : fields;

    // Map fields
    const mappedFields = rawFields.map((f: any) => ({
      name: f.name,
      type: f.type || 'text',
      isRequired: f.isRequired ?? true,
      validationRegex: f.validationRegex
    }));

    org.documentModels.push({
      name,
      fields: mappedFields,
      validityDays: Number(validityDays),
      modelImagePath
    });

    await org.save();
    res.json(org);
  } catch (error: any) {
    console.error('Error in addDocumentModel:', error);
    res.status(500).json({ error: error.message });
  }
};

export const updateDocumentModel = async (req: Request, res: Response) => {
  try {
    const { orgId, modelId } = req.params;
    const { name, fields, validityDays } = req.body;
    const modelImagePath = req.file?.path;

    const org = await Organization.findById(orgId);
    if (!org) return res.status(404).json({ error: "Organization not found" });

    const modelIndex = org.documentModels.findIndex(m => (m as any)._id.toString() === modelId);
    if (modelIndex === -1) return res.status(404).json({ error: "Template not found" });

    const rawFields = typeof fields === 'string' ? JSON.parse(fields) : fields;
    const mappedFields = rawFields.map((f: any) => ({
      name: f.name,
      type: f.type || 'text',
      isRequired: f.isRequired ?? true
    }));

    org.documentModels[modelIndex].name = name;
    org.documentModels[modelIndex].fields = mappedFields;
    org.documentModels[modelIndex].validityDays = Number(validityDays);
    if (modelImagePath) {
      org.documentModels[modelIndex].modelImagePath = modelImagePath;
    }

    await org.save();
    res.json(org);
  } catch (error: any) {
    console.error('Error in updateDocumentModel:', error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteDocumentModel = async (req: Request, res: Response) => {
  try {
    const { orgId, modelId } = req.params;
    const org = await Organization.findById(orgId);
    if (!org) return res.status(404).json({ error: "Organization not found" });

    org.documentModels = org.documentModels.filter(m => (m as any)._id.toString() !== modelId) as any;
    await org.save();
    res.json({ message: "Template deleted successfully" });
  } catch (error: any) {
    console.error('Error in deleteDocumentModel:', error);
    res.status(500).json({ error: error.message });
  }
};

export const updateOrganizationAssets = async (req: Request, res: Response) => {
  try {
    const { orgId } = req.params;
    const org = await Organization.findById(orgId);
    if (!org) return res.status(404).json({ error: "Organization not found" });

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    
    if (files['seal']) {
      org.sealUrl = files['seal'][0].path;
    }
    if (files['signature']) {
      org.signatureUrl = files['signature'][0].path;
    }

    await org.save();
    res.json(org);
  } catch (error: any) {
    console.error('Error in updateOrganizationAssets:', error);
    res.status(500).json({ error: error.message });
  }
};


export const createUser = async (req: Request, res: Response) => {
  try {
    const { fullName, email, organizationId, personalIdNumber } = req.body;
    console.log('Creating user:', { fullName, email });
    
    const user = new User({
      fullName,
      email,
      organizationId,
      personalIdNumber
    });

    await user.save();
    console.log('User created successfully');
    res.status(201).json(user);
  } catch (error: any) {
    console.error('Error in createUser:', error);
    res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      console.warn('User not found:', email);
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      message: "Login successful",
      user,
      token: "mock-user-token"
    });
  } catch (error: any) {
    console.error('Error in loginUser:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getUserDashboard = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Fetch Verification Requests
    const verificationRequests = await VerificationRequest.find({ userId }).sort({ createdAt: -1 });
    
    // Fetch Document Creation Applications
    const applications = await DocumentCreationRequest.find({ userId }).populate('organizationId', 'name').sort({ createdAt: -1 });

    const stats = {
      verified: verificationRequests.filter(r => r.status === 'verified').length,
      rejected: verificationRequests.filter(r => r.status === 'rejected').length,
      pending: verificationRequests.filter(r => r.status === 'pending').length,
      issued: applications.filter(a => a.status === 'created').length,
      total: verificationRequests.length
    };

    res.json({
      user,
      stats,
      recentActivity: verificationRequests,
      applications
    });
  } catch (error: any) {
    console.error('Error in getUserDashboard:', error);
    res.status(500).json({ error: error.message });
  }
};

import Verification from "../models/verification.model";
import asyncHandler from "express-async-handler";
import Organization from '../models/organization.model';


export const requestVerificationLegacyDoc = asyncHandler(async (req, res) => {
    const { OrganizationId, documentId , documentPic } = req.body;
    const userId = req.user._id;

    const organization = await Organization.findById(OrganizationId);
    if (!organization) {
        return res.status(404).json({ message: 'Organization not found' });
    }

    const verificationRequest = new Verification({
        documentId,
        documentPic,
        user: userId,
        organization: OrganizationId,
        authenticityScore: null,
        adminVerification: 'pending',
        userVerification: 'pending',
    });

    await verificationRequest.save();

    // Add verification request to organization's list
    organization.verificationRequests.push(verificationRequest._id);
    await organization.save();

    res.status(201).json({
        message: 'Verification request submitted successfully',
        verificationRequest,
    });
}
);

export const getVerificationRequestsForOrganization = asyncHandler(async (req, res) => {
    const organizationId = req.params.orgId;

    const verificationRequests = await Verification.find({ organization: organizationId })
        .populate('documentId')
        .populate('user');
        
    res.status(200).json({ verificationRequests });
}
);
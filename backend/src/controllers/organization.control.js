
import Organization from '../models/organization.model.js';
import User from '../models/user.model.js';
import DocumentTemplate from '../models/DocumentTemplate.model.js';
import Document from '../models/document.model.js';
import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';
import Verification from '../models/verification.model.js';
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import upload from '../utils/multer.js';

export const registerOrganization = [
    body('name').not().isEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password, address, phone } = req.body;

        let organization = await Organization.findOne({ email, name });
        if (organization) {
            return res.status(400).json({ message: 'Organization already exists' });
        }

        organization = new Organization({ name, email, password, address, phone });
        await organization.save();
        res.status(201).json({ message: 'Organization registered successfully', organization });
    })
];

export const loginOrganization = [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').not().isEmpty().withMessage('Password is required'),
    asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        const organization = await Organization.findOne({ email });
        if (!organization) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await organization.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        res.status(200).json({ message: 'Login successful', organization });
    })
];

export const getOrganizations = asyncHandler(async (req, res) => {
    const organizations = await Organization.find().populate('users', 'name email');
    res.status(200).json({ organizations });
});

export const getOrganizationById = asyncHandler(async (req, res) => {
    const organization = await Organization.findById(req.params.id).populate('users', 'name email');
    if (!organization) {
        return res.status(404).json({ message: 'Organization not found' });
    }
    res.status(200).json({ organization });
});

export const addUserToOrganization = [
    body('organizationId').not().isEmpty().withMessage('Organization ID is required'),
    body('userId').not().isEmpty().withMessage('User ID is required'),
    asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { organizationId, userId } = req.body;

        const organization = await Organization.findById(organizationId);
        if (!organization) {
            return res.status(404).json({ message: 'Organization not found' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (organization.users.includes(userId)) {
            return res.status(400).json({ message: 'User already in organization' });
        }

        organization.users.push(userId);
        user.organization = organizationId;

        await organization.save();
        await user.save();

        res.status(200).json({ message: 'User added to organization successfully', organization });
    })
];

export const removeUserFromOrganization = [
    body('organizationId').not().isEmpty().withMessage('Organization ID is required'),
    body('userId').not().isEmpty().withMessage('User ID is required'),
    asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { organizationId, userId } = req.body;

        const organization = await Organization.findById(organizationId);
        if (!organization) {
            return res.status(404).json({ message: 'Organization not found' });
        }

        organization.users = organization.users.filter(id => id.toString() !== userId);
        await organization.save();
        res.status(200).json({ message: 'User removed from organization successfully', organization });
    })
];

export const deleteOrganization = asyncHandler(async (req, res) => {
    const organization = await Organization.findByIdAndDelete(req.params.id);
    if (!organization) {
        return res.status(404).json({ message: 'Organization not found' });
    }
    res.status(200).json({ message: 'Organization deleted successfully' });
});

export const updateOrganization = asyncHandler(async (req, res) => {
    const organization = await Organization.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    if (!organization) {
        return res.status(404).json({ message: 'Organization not found' });
    }
    res.status(200).json({ message: 'Organization updated successfully', organization });
});

export const addDocumentToOrganization = [
    body('organizationId').not().isEmpty().withMessage('Organization ID is required'),
    body('documentId').not().isEmpty().withMessage('Document ID is required'),
    asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { organizationId, documentId } = req.body;

        const organization = await Organization.findById(organizationId);
        if (!organization) {
            return res.status(404).json({ message: 'Organization not found' });
        }

        if (organization.documents.includes(documentId)) {
            return res.status(400).json({ message: 'Document already in organization' });
        }

        organization.documents.push(documentId);
        await organization.save();
        res.status(200).json({ message: 'Document added to organization successfully', organization });
    })
];

export const removeDocumentFromOrganization = [
    body('organizationId').not().isEmpty().withMessage('Organization ID is required'),
    body('documentId').not().isEmpty().withMessage('Document ID is required'),
    asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { organizationId, documentId } = req.body;

        const organization = await Organization.findById(organizationId);
        if (!organization) {
            return res.status(404).json({ message: 'Organization not found' });
        }

        organization.documents = organization.documents.filter(id => id.toString() !== documentId);
        await organization.save();
        res.status(200).json({ message: 'Document removed from organization successfully', organization });
    })
];

export const createDocumentTemplate = [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('name').not().isEmpty().withMessage('Name is required'),
    body('dob').isISO8601().toDate().withMessage('Date of birth is required'),
    body('organization').not().isEmpty().withMessage('Organization is required'),
    asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, name, dob, organization, image } = req.body;
        const newTemplate = new DocumentTemplate({
            title,
            name,
            dob,
            organization,
            image,
        });
        await newTemplate.save();
        res.status(201).json({ message: 'Document template created successfully', template: newTemplate });
    })
];

export const createDocument = [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('content').not().isEmpty().withMessage('Content is required'),
    body('owner').not().isEmpty().withMessage('Owner is required'),
    body('documentType').not().isEmpty().withMessage('Document type is required'),
    asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, content, owner, documentType } = req.body;
        const newDocument = new Document({
            title,
            content,
            owner,
            documentType,
        });
        await newDocument.save();
        res.status(201).json({ message: 'Document created successfully', document: newDocument });
    })
];

import upload from '../utils/multer.js';
export const verifyUserDoc = [
    upload.single('userDoc'),
    asyncHandler(async (req, res) => {
        const { documentId, verificationId } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: 'User document is required' });
        }

        const verificationRequest = await Verification.findById(verificationId);
        if (!verificationRequest) {
            return res.status(404).json({ message: 'Verification request not found' });
        }

        try {
            const userDocBuffer = fs.readFileSync(req.file.path);
            fs.unlinkSync(req.file.path); // Delete the temporary file

            const formData = new FormData();
            formData.append('file', userDocBuffer, { filename: 'userDoc.jpg' });

            const response = await axios.post('http://localhost:5001/api/extract', formData, {
                headers: {
                    ...formData.getHeaders()
                }
            });

            const extractedData = response.data;

            const idealDocument = await Document.findById(documentId).populate('content');
            if (!idealDocument) {
                return res.status(404).json({ message: 'Ideal document not found' });
            }

            // Placeholder for comparison logic
            const isVerified = JSON.stringify(extractedData) === JSON.stringify(idealDocument.content);

            //now documents content verified let use cnn  model and send idealPic and docPic for authenticity score
           

            if (isVerified) {
                 const response2 = await axios.post('http://localhost:5002/api/verify', formData, {
                headers: {
                    ...formData.getHeaders()
                }
            });

            const authenticityResult = response2.data;
            verificationRequest.authenticityScore = authenticityResult.score;
            if(authenticityResult.score > 80){
                verificationRequest.adminVerification = 'approved';
                await verificationRequest.save();
                res.status(200).json({ message: 'Document verified successfully', extractedData , authenticityScore: authenticityResult.score});
            }else{
                verificationRequest.adminVerification = 'rejected';
                await verificationRequest.save();
                res.status(400).json({ message: 'Document authenticity low', extractedData ,authenticityScore: authenticityResult.score });
            } 
        }
        else {
                verificationRequest.adminVerification = 'rejected';
                await verificationRequest.save();
                res.status(400).json({ message: 'Document verification failed', extractedData });
            }

        } catch (error) {
            console.error('Error during verification:', error);
            res.status(500).json({ message: 'Error during verification' });
        }
    })
];


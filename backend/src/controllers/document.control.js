import Document from '../models/document.model.js';
import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';
import upload from '../utils/multer.js'; // Import the shared multer configuration
import fs from 'fs'; // Import fs for file system operations

export const createDocument = [
    upload.single('idealDocPic'), // 'idealDocPic' is the field name for the file upload
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content ID is required'),
    body('owner').notEmpty().withMessage('Owner ID is required'),
    body('documentType').isIn(['legacy', 'digital']).withMessage('Invalid document type'),
    asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // If there are validation errors, and a file was uploaded, delete it
            if (req.file) {
                fs.unlinkSync(req.file.path); // Delete the uploaded file
            }
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, content, owner, documentType } = req.body;
        
        if (!req.file) {
            return res.status(400).json({ message: 'idealDocPic is required' });
        }

        const idealDocPic = fs.readFileSync(req.file.path); // Read the file into a buffer
        fs.unlinkSync(req.file.path); // Delete the temporary file

        const document = new Document({
            title,
            idealDocPic,
            content,
            owner,
            documentType,
        });

        await document.save();
        res.status(201).json({ message: 'Document created successfully', document });
    })
];

export const getDocuments = asyncHandler(async (req, res) => {
    const documents = await Document.find({ owner: req.params.orgId }).populate('content');
    res.status(200).json({ documents });
});

export const getDocumentById = asyncHandler(async (req, res) => {
    const document = await Document.findById(req.params.docId).populate('content');
    if (!document) {
        return res.status(404).json({ message: 'Document not found' });
    }
    res.status(200).json({ document });
});

export const updateDocumentStatus = [
    body('status').isIn(['pending', 'approved', 'rejected']).withMessage('Invalid status'),
    asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { status } = req.body;
        const document = await Document.findById(req.params.docId);

        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }

        document.status = status;
        await document.save();
        res.status(200).json({ message: 'Document status updated successfully', document });
    })
];

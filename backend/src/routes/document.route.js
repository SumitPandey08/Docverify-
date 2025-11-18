import express from 'express';
import { getDocuments, getDocumentById, updateDocumentStatus, createDocument } from '../controllers/document.control.js';
import auth from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/', auth, createDocument);
router.get('/:orgId', auth, getDocuments);
router.get('/:docId', auth, getDocumentById);
router.put('/:docId/status', auth, updateDocumentStatus);

export default router;

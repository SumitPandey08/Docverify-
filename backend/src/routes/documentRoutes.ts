import { Router } from 'express';
import { verifyDocument } from '../controller/documentController.js';
import { applyForDocument } from '../controller/requestController.js';
import { upload } from '../middleware/upload.js';

const router = Router();

router.post('/verify', upload.single('document'), verifyDocument);
router.post('/apply', applyForDocument);

export default router;

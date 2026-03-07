import { Router } from 'express';
import { approveAndCreateDocument } from '../controller/requestController.js';

const router = Router();

router.post('/:requestId/approve', approveAndCreateDocument);

export default router;

import { Router } from 'express';
import organizationRoutes from './organizationRoutes.js';
import userRoutes from './userRoutes.js';
import documentRoutes from './documentRoutes.js';
import applicationRoutes from './applicationRoutes.js';

const router = Router();

router.use('/organizations', organizationRoutes);
router.use('/users', userRoutes);
router.use('/documents', documentRoutes);
router.use('/applications', applicationRoutes);

export default router;

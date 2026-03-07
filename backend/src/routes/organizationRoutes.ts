import { Router } from 'express';
import { createOrganization, addDocumentModel, loginOrganization, getOrganizationDashboard, updateDocumentModel, deleteDocumentModel } from '../controller/organizationController.js';
import { getApplications, approveAndCreateDocument } from '../controller/requestController.js';
import { upload } from '../middleware/upload.js';

const router = Router();

router.post('/', createOrganization);
router.post('/login', loginOrganization);
router.get('/:orgId/dashboard', getOrganizationDashboard);
router.post('/:orgId/model', upload.single('modelImage'), addDocumentModel);
router.put('/:orgId/model/:modelId', upload.single('modelImage'), updateDocumentModel);
router.delete('/:orgId/model/:modelId', deleteDocumentModel);
router.get('/:organizationId/applications', getApplications);
router.post('/applications/:requestId/approve', approveAndCreateDocument);

export default router;

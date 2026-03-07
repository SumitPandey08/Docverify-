import { Router } from 'express';
import { createUser, loginUser, getUserDashboard, listOrganizations } from '../controller/organizationController.js';

const router = Router();

router.get('/organizations', listOrganizations);
router.post('/', createUser);
router.post('/login', loginUser);
router.get('/:userId/dashboard', getUserDashboard);

export default router;

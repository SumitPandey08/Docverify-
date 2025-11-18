
import express from 'express';
import { 
    registerOrganization, 
    loginOrganization, 
    getOrganizations, 
    getOrganizationById, 
    addUserToOrganization, 
    removeUserFromOrganization, 
    deleteOrganization, 
    updateOrganization, 
    addDocumentToOrganization, 
    removeDocumentFromOrganization,
    createDocumentTemplate,
    createDocument,
    verifyUserDoc
} from '../controllers/organization.control.js';

const router = express.Router();

router.post('/register', registerOrganization);
router.post('/login', loginOrganization);
router.get('/', getOrganizations);
router.get('/:id', getOrganizationById);
router.post('/add-user', addUserToOrganization);
router.post('/remove-user', removeUserFromOrganization);
router.delete('/:id', deleteOrganization);
router.put('/:id', updateOrganization);
router.post('/add-document', addDocumentToOrganization);
router.post('/remove-document', removeDocumentFromOrganization);
router.post('/document-templates', createDocumentTemplate);
router.post('/documents', createDocument);
router.post('/verify-doc', verifyUserDoc);

export default router;
import express from 'express';
import { renderOrganizations, renderOrganizationDetail } from '../controllers/organizationController.js';

const router = express.Router();

router.get('/organizations', renderOrganizations);
router.get('/organization/:id', renderOrganizationDetail);

export default router;
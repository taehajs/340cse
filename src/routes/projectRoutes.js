import express from 'express';
import { renderProjects, renderProjectDetail } from '../controllers/projectController.js';

const router = express.Router();

router.get('/projects', renderProjects);
router.get('/project/:id', renderProjectDetail);

export default router;
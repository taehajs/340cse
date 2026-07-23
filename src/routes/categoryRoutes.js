import express from 'express';
import { 
    showProjectsPage, 
    showProjectDetailsPage 
} from '../controllers/projectController.js';

const router = express.Router();

router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetailsPage); // 또는 /projects/:id

export default router;
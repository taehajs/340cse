import express from 'express';
import { 
    renderCategories, 
    renderCategoryDetail 
} from '../controllers/categoryController.js';

const router = express.Router();

router.get('/categories', renderCategories);

router.get('/category/:id', renderCategoryDetail);
router.get('/categories/:id', renderCategoryDetail);

export default router;
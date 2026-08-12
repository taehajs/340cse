import express from 'express';
import { 
    renderCategories, 
    renderCategoryDetail,
    renderAddCategoryForm,
    handleAddCategory,
    renderEditCategoryForm,
    handleEditCategory
} from '../controllers/categoryController.js'; 

const router = express.Router();

router.get('/categories', renderCategories);
router.get('/category/:id', renderCategoryDetail);
router.get('/categories/:id', renderCategoryDetail);

router.get('/new-category', renderAddCategoryForm);
router.post('/new-category', handleAddCategory);

router.get('/edit-category/:id', renderEditCategoryForm);
router.post('/edit-category/:id', handleEditCategory);

export default router;
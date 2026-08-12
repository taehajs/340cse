import { 
    getAllCategories, 
    getCategoryById, 
    createCategory, 
    updateCategory 
} from '../models/categories.js';
import { getProjectsByCategoryId } from '../models/projects.js';

// 기존 renderCategories, renderCategoryDetail 코드 유지...

/**
 * 카테고리 생성 폼 렌더링
 */
export async function renderAddCategoryForm(req, res, next) {
    try {
        res.render('new-category', { 
            title: 'Add New Category', 
            errors: null, 
            categoryName: '' 
        });
    } catch (error) {
        next(error);
    }
}

/**
 * 카테고리 생성 처리 (POST)
 */
export async function handleAddCategory(req, res, next) {
    try {
        const { name } = req.body;
        const errors = [];

        // Server-side Validation
        if (!name || name.trim() === '') {
            errors.push('Category name is required.');
        } else if (name.trim().length < 3) {
            errors.push('Category name must be at least 3 characters long.');
        } else if (name.trim().length > 100) {
            errors.push('Category name cannot exceed 100 characters.');
        }

        if (errors.length > 0) {
            return res.status(400).render('new-category', {
                title: 'Add New Category',
                errors,
                categoryName: name
            });
        }

        await createCategory(name.trim());
        res.redirect('/categories');
    } catch (error) {
        console.error("handleAddCategory Error:", error);
        next(error);
    }
}

/**
 * 카테고리 수정 폼 렌더링 (Pre-populate existing data)
 */
export async function renderEditCategoryForm(req, res, next) {
    try {
        const categoryId = req.params.id;
        const category = await getCategoryById(categoryId);

        if (!category) {
            const err = new Error('Category Not Found');
            err.status = 404;
            return next(err);
        }

        res.render('edit-category', {
            title: 'Edit Category',
            errors: null,
            category
        });
    } catch (error) {
        console.error("renderEditCategoryForm Error:", error);
        next(error);
    }
}


export async function handleEditCategory(req, res, next) {
    try {
        const categoryId = req.params.id;
        const { name } = req.body;
        const errors = [];

        // Server-side Validation
        if (!name || name.trim() === '') {
            errors.push('Category name is required.');
        } else if (name.trim().length < 3) {
            errors.push('Category name must be at least 3 characters long.');
        } else if (name.trim().length > 100) {
            errors.push('Category name cannot exceed 100 characters.');
        }

        if (errors.length > 0) {
            return res.status(400).render('edit-category', {
                title: 'Edit Category',
                errors,
                category: { category_id: categoryId, name }
            });
        }

        await updateCategory(categoryId, name.trim());
        res.redirect('/categories');
    } catch (error) {
        console.error("handleEditCategory Error:", error);
        next(error);
    }
}
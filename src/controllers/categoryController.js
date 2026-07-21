import { getAllCategories, getCategoryById } from '../models/categories.js';
import { getProjectsByCategoryId } from '../models/projects.js';

export async function renderCategories(req, res, next) {
    try {
        const categories = await getAllCategories();
        res.render('categories', { title: 'Service Project Categories', categories });
    } catch (error) {
        console.error("renderCategories Error:", error);
        next(error);
    }
}

export async function renderCategoryDetail(req, res, next) {
    try {
        const categoryId = req.params.id;
        const category = await getCategoryById(categoryId);
        if (!category) {
            const err = new Error('Category Not Found');
            err.status = 404;
            return next(err);
        }
        const projects = await getProjectsByCategoryId(categoryId) || [];
        res.render('category-detail', { title: `${category.name} Projects`, category, projects });
    } catch (error) {
        console.error("renderCategoryDetail Error:", error);
        next(error);
    }
}
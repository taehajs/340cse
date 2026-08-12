import pool from './db.js';


export async function getAllCategories() {
    const queryText = 'SELECT category_id, name FROM category ORDER BY name ASC';
    try {
        const result = await pool.query(queryText);
        return result.rows;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
}


export async function getCategoryById(id) {
    const queryText = 'SELECT category_id, name FROM category WHERE category_id = $1';
    try {
        const result = await pool.query(queryText, [id]);
        return result.rows[0];
    } catch (error) {
        console.error("Error fetching category by ID:", error);
        throw error;
    }
}


export async function getCategoriesByProjectId(projectId) {
    const queryText = `
        SELECT c.category_id, c.name 
        FROM category c
        JOIN project_category pc ON c.category_id = pc.category_id
        WHERE pc.project_id = $1
        ORDER BY c.name ASC
    `;
    try {
        const result = await pool.query(queryText, [projectId]);
        return result.rows;
    } catch (error) {
        console.error("Error fetching categories for project:", error);
        throw error;
    }
}

export async function createCategory(name) {
    const queryText = 'INSERT INTO category (name) VALUES ($1) RETURNING *';
    try {
        const result = await pool.query(queryText, [name]);
        return result.rows[0];
    } catch (error) {
        console.error("Error creating category:", error);
        throw error;
    }
}


export async function updateCategory(id, name) {
    const queryText = 'UPDATE category SET name = $1 WHERE category_id = $2 RETURNING *';
    try {
        const result = await pool.query(queryText, [name, id]);
        return result.rows[0];
    } catch (error) {
        console.error("Error updating category:", error);
        throw error;
    }
}
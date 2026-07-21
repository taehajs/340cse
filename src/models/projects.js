import pool from './db.js';

export async function getAllProjects() {
    const queryText = 'SELECT * FROM project ORDER BY date ASC';
    try {
        const result = await pool.query(queryText);
        return result.rows;
    } catch (error) {
        console.error("Error fetching projects:", error);
        throw error;
    }
}

export async function getProjectById(id) {
    const queryText = 'SELECT * FROM project WHERE project_id = $1';
    try {
        const result = await pool.query(queryText, [id]);
        return result.rows[0];
    } catch (error) {
        console.error("Error fetching project by ID:", error);
        throw error;
    }
}

export async function getProjectsByCategoryId(categoryId) {
    const queryText = `
        SELECT p.* 
        FROM project p
        JOIN project_category pc ON p.project_id = pc.project_id
        WHERE pc.category_id = $1
        ORDER BY p.title ASC
    `;
    try {
        const result = await pool.query(queryText, [categoryId]);
        return result.rows;
    } catch (error) {
        console.error("Error fetching projects for category:", error);
        throw error;
    }
}
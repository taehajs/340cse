import pool from './db.js';

export async function getAllCategories() {
    const queryText = 'SELECT category_id, name FROM category ORDER BY name ASC';
    try {
        const result = await pool.query(queryText);
        return result.rows;
    } catch (error) {
        console.error("Error fetching categories in model:", error);
        throw error;
    }
}
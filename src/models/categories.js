import pool from './db.js';


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
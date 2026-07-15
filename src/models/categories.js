import { pool } from './db.js';

export async function getAllCategories() {
    try {
        const sql = 'SELECT * FROM categories ORDER BY name ASC';
        const result = await pool.query(sql);
        return result.rows;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
}
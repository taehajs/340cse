import pool from './db.js';

export async function getAllProjects() {
    const queryText = `
        SELECT p.project_id, p.title, p.description, p.location, p.date, o.name AS organization_name
        FROM project p
        JOIN organization o ON p.organization_id = o.organization_id
        ORDER BY p.date ASC
    `;
    
    try {
        const result = await pool.query(queryText);
        return result.rows;
    } catch (error) {
        console.error("Error fetching projects from database:", error);
        throw error;
    }
}
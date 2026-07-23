import pool from './db.js';

/**
 * Retrieves the next number_of_projects upcoming service projects.
 * @param {number} number_of_projects - The maximum number of projects to retrieve.
 */
export async function getUpcomingProjects(number_of_projects = 5) {
    const queryText = `
        SELECT p.*, o.name AS organization_name 
        FROM project p
        JOIN organization o ON p.organization_id = o.organization_id
        WHERE p.date >= CURRENT_DATE
        ORDER BY p.date ASC
        LIMIT $1
    `;
    try {
        const result = await pool.query(queryText, [number_of_projects]);
        return result.rows;
    } catch (error) {
        console.error("Error fetching upcoming projects:", error);
        throw error;
    }
}

/**
 * Retrieves a single service project by its ID, including organization name.
 * @param {number|string} id - Service project ID.
 */
export async function getProjectDetails(id) {
    const queryText = `
        SELECT p.*, o.name AS organization_name 
        FROM project p
        JOIN organization o ON p.organization_id = o.organization_id
        WHERE p.project_id = $1
    `;
    try {
        const result = await pool.query(queryText, [id]);
        return result.rows[0];
    } catch (error) {
        console.error("Error fetching project details by ID:", error);
        throw error;
    }
}

// Alias for backwards compatibility with existing controllers
export const getProjectById = getProjectDetails;

/**
 * Retrieves all service projects associated with a given category ID.
 * @param {number|string} categoryId - Category ID.
 */
export async function getProjectsByCategoryId(categoryId) {
    const queryText = `
        SELECT p.*, o.name AS organization_name
        FROM project p
        JOIN project_category pc ON p.project_id = pc.project_id
        JOIN organization o ON p.organization_id = o.organization_id
        WHERE pc.category_id = $1
        ORDER BY p.date ASC
    `;
    try {
        const result = await pool.query(queryText, [categoryId]);
        return result.rows;
    } catch (error) {
        console.error("Error fetching projects for category:", error);
        throw error;
    }
}
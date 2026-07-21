import pool from './db.js';

export async function getAllOrganizations() {
    const queryText = 'SELECT * FROM organization ORDER BY name ASC';
    try {
        const result = await pool.query(queryText);
        return result.rows;
    } catch (error) {
        console.error("Error fetching organizations:", error);
        throw error;
    }
}

export async function getOrganizationById(id) {
    const queryText = 'SELECT * FROM organization WHERE organization_id = $1';
    try {
        const result = await pool.query(queryText, [id]);
        return result.rows[0];
    } catch (error) {
        console.error("Error fetching organization by ID:", error);
        throw error;
    }
}

export async function getProjectsByOrganizationId(organizationId) {
    const queryText = 'SELECT * FROM project WHERE organization_id = $1 ORDER BY date ASC';
    try {
        const result = await pool.query(queryText, [organizationId]);
        return result.rows;
    } catch (error) {
        console.error("Error fetching projects for organization:", error);
        throw error;
    }
}
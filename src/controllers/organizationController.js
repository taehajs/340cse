import { getAllOrganizations, getOrganizationById, getProjectsByOrganizationId } from '../models/organizations.js';

export async function renderOrganizations(req, res, next) {
    try {
        const organizations = await getAllOrganizations();
        res.render('organizations', { title: 'Our Partner Organizations', organizations });
    } catch (error) {
        next(error);
    }
}

export async function renderOrganizationDetail(req, res, next) {
    try {
        const organizationId = req.params.id;
        const organization = await getOrganizationById(organizationId);
        if (!organization) {
            const err = new Error('Organization Not Found');
            err.status = 404;
            return next(err);
        }
        const projects = await getProjectsByOrganizationId(organizationId);
        res.render('organization-detail', { title: organization.name, organization, projects });
    } catch (error) {
        next(error);
    }
}

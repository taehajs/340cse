import { getUpcomingProjects, getProjectById } from '../models/projects.js';
import { getCategoriesByProjectId } from '../models/categories.js';

export async function renderProjects(req, res, next) {
    try {
        const projects = await getUpcomingProjects();
        res.render('projects', { title: 'Upcoming Projects', projects });
    } catch (error) {
        next(error);
    }
}

export async function renderProjectDetail(req, res, next) {
    try {
        const projectId = req.params.id;
        const project = await getProjectById(projectId);
        if (!project) {
            const err = new Error('Project Not Found');
            err.status = 404;
            return next(err);
        }
        const categories = await getCategoriesByProjectId(projectId);
        res.render('project-detail', { title: project.title, project, categories });
    } catch (error) {
        next(error);
    }
}
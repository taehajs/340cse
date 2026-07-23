import { 
    getUpcomingProjects, 
    getProjectDetails 
} from '../models/projects.js';
import { 
    getCategoriesByProjectId 
} from '../models/categories.js';

const NUMBER_OF_UPCOMING_PROJECTS = 5;

/**
 * Controller to render the main upcoming projects page.
 */
export async function showProjectsPage(req, res, next) {
    try {
        const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
        res.render('projects', { 
            title: 'Upcoming Service Projects', 
            projects 
        });
    } catch (error) {
        console.error("showProjectsPage Error:", error);
        next(error);
    }
}

/**
 * Controller to render a single service project detail page.
 */
export async function showProjectDetailsPage(req, res, next) {
    try {
        const projectId = req.params.id;
        const project = await getProjectDetails(projectId);

        if (!project) {
            const err = new Error('Project Not Found');
            err.status = 404;
            return next(err);
        }

        const categories = await getCategoriesByProjectId(projectId) || [];

        // views/project-detail.ejs 렌더링
        res.render('project-detail', { 
            title: project.title, 
            project, 
            categories 
        });
    } catch (error) {
        console.error("showProjectDetailsPage Error:", error);
        next(error);
    }
}
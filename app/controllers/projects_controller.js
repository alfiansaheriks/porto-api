import Project from '#models/project';
import { createProjectValidator, updateProjectValidator } from '#validators/project';
export default class ProjectsController {
    async index({ response }) {
        const projects = await Project.query().orderBy('date', 'desc');
        response.json(projects);
        return projects;
    }
    async show({ response, params }) {
        try {
            const project = await Project.findByOrFail('slug', params.slug);
            return response.json(project);
        }
        catch (error) {
            return response.notFound({ message: 'Project not found' });
        }
    }
    async showById({ response, params }) {
        try {
            const project = await Project.findOrFail(params.id);
            return response.json(project);
        }
        catch (error) {
            return response.notFound({ message: 'Project not found' });
        }
    }
    async store({ auth, response, request }) {
        const data = request.all();
        const payload = await createProjectValidator.validate(data);
        const project = await Project.create(payload);
        response.send(project);
        return project;
    }
    async update({ request, response, params }) {
        try {
            const project = await Project.findOrFail(params.id);
            const data = request.all();
            const payload = await updateProjectValidator.validate(data);
            const updatedProject = await project.merge(payload).save();
            return response.json(updatedProject);
        }
        catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }
    async destroy({ response, params }) {
        try {
            const project = await Project.findOrFail(params.id);
            await project.delete();
            return response.json({ message: 'Project deleted' });
        }
        catch (error) {
            return response.status(500).json({ error: 'Something went wrong' });
        }
    }
}
//# sourceMappingURL=projects_controller.js.map
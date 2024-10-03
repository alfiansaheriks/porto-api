import ProjectCategory from '#models/project_category';
import { createCategoryValidator, updateCategoryValidator } from '#validators/category';
export default class ProjectCategoriesController {
    async index({ response }) {
        try {
            const projectCategories = await ProjectCategory.all();
            return response.json(projectCategories);
        }
        catch (error) {
            return response.status(500).json({ error: 'Something went wrong' });
        }
    }
    async store({ request, response }) {
        try {
            const data = request.body();
            const payload = await createCategoryValidator.validate(data);
            const category = await ProjectCategory.create(payload);
            return response.send(category);
        }
        catch (error) {
            return response.status(500).json({ error: 'Something went wrong' });
        }
    }
    async update({ request, response, params }) {
        try {
            const projectCategory = await ProjectCategory.findOrFail(params.id);
            const data = request.only(['name']);
            const payload = await updateCategoryValidator.validate(data);
            projectCategory.merge(payload);
            await projectCategory.save();
            return response.json(projectCategory);
        }
        catch (error) {
            return response.status(500).json({ error: 'Something went wrong' });
        }
    }
    async destroy({ response, params }) {
        try {
            const projectCategory = await ProjectCategory.findOrFail(params.id);
            await projectCategory.delete();
            return response.json({ message: 'Category deleted' });
        }
        catch (error) {
            return response.status(500).json({ error: 'Something went wrong' });
        }
    }
}
//# sourceMappingURL=project_categories_controller.js.map
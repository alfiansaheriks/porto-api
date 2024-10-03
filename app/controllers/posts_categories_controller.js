import PostCategory from '#models/post_category';
export default class PostsCategoriesController {
    async index({ response }) {
        try {
            const postsCategories = await PostCategory.all();
            return response.json(postsCategories);
        }
        catch (error) {
            return response.status(500).json({ error: 'Something went wrong' });
        }
    }
    async store({ request, response }) {
        try {
            const postCategory = new PostCategory();
            postCategory.name = request.input('name');
            await postCategory.save();
            return response.json(postCategory);
        }
        catch (error) {
            return response.status(500).json({ error: 'Something went wrong' });
        }
    }
    async update({ request, response, params }) {
        try {
            const postCategory = await PostCategory.findOrFail(params.id);
            postCategory.name = request.input('name');
            await postCategory.save();
            return response.json(postCategory);
        }
        catch (error) {
            return response.status(500).json({ error: 'Something went wrong' });
        }
    }
    async destroy({ response, params }) {
        try {
            const postCategory = await PostCategory.findOrFail(params.id);
            await postCategory.delete();
            return response.json({ message: 'Post category deleted' });
        }
        catch (error) {
            return response.status(500).json({ error: 'Something went wrong' });
        }
    }
}
//# sourceMappingURL=posts_categories_controller.js.map
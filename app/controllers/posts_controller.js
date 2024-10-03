import Post from '#models/post';
export default class PostsController {
    async index({ response }) {
        try {
            const posts = await Post.all();
            return response.json(posts);
        }
        catch (error) {
            return response.status(500).json({ error: 'Something went wrong' });
        }
    }
    async store({ request, response }) {
        try {
            const post = new Post();
            post.title = request.input('title');
            post.content = request.input('content');
            post.categoryId = request.input('categoryId');
            post.userId = request.input('userId');
            post.slug = request.input('slug');
            post.icon = request.input('icon');
            await post.save();
            return response.json(post);
        }
        catch (error) {
            return response.status(500).json({ error: 'Something went wrong' });
        }
    }
    async update({ request, response, params }) {
        try {
            const post = await Post.findOrFail(params.id);
            post.title = request.input('title');
            post.content = request.input('content');
            post.categoryId = request.input('categoryId');
            post.userId = request.input('userId');
            post.slug = request.input('slug');
            post.icon = request.input('icon');
            await post.save();
            return response.json(post);
        }
        catch (error) {
            return response.status(500).json({ error: 'Something went wrong' });
        }
    }
    async destroy({ response, params }) {
        try {
            const post = await Post.findOrFail(params.id);
            await post.delete();
            return response.json({ message: 'Post deleted successfully' });
        }
        catch (error) {
            return response.status(500).json({ error: 'Something went wrong' });
        }
    }
    async show({ response, params }) {
        try {
            const post = await Post.findByOrFail('slug', params.slug);
            return response.json(post);
        }
        catch (error) {
            return response.status(500).json({ error: 'Something went wrong' });
        }
    }
    async showById({ response, params }) {
        try {
            const post = await Post.findOrFail(params.id);
            return response.json(post);
        }
        catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }
}
//# sourceMappingURL=posts_controller.js.map
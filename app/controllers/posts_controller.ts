import Post from '#models/post'
import type { HttpContext } from '@adonisjs/core/http'

export default class PostsController {
  async index({ response }: HttpContext) {
    try {
      // Fetch all posts
      const posts = await Post.all()
      return response.json(posts)
    } catch (error) {
      return response.status(500).json({ error: 'Something went wrong' })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      // Create a new post
      const post = new Post()
      post.title = request.input('title')
      post.content = request.input('content')
      post.categoryId = request.input('categoryId')
      post.userId = request.input('userId')
      post.slug = request.input('slug')
      post.icon = request.input('icon')
      await post.save()
      return response.json(post)
    } catch (error) {
      return response.status(500).json({ error: 'Something went wrong' })
    }
  }

  async update({ request, response, params }: HttpContext) {
    try {
      // Update a post
      const post = await Post.findOrFail(params.id)
      post.title = request.input('title')
      post.content = request.input('content')
      post.categoryId = request.input('categoryId')
      post.userId = request.input('userId')
      post.slug = request.input('slug')
      post.icon = request.input('icon')
      await post.save()
      return response.json(post)
    } catch (error) {
      return response.status(500).json({ error: 'Something went wrong' })
    }
  }

  async destroy({ response, params }: HttpContext) {
    try {
      // Delete a post
      const post = await Post.findOrFail(params.id)
      await post.delete()
      return response.json({ message: 'Post deleted successfully' })
    } catch (error) {
      return response.status(500).json({ error: 'Something went wrong' })
    }
  }
  async show({ response, params }: HttpContext) {
    try {
      // Fetch a single post
      const post = await Post.findByOrFail('slug', params.slug)
      return response.json(post)
    } catch (error) {
      return response.status(500).json({ error: 'Something went wrong' })
    }
  }
  public async showById({ response, params }: HttpContext) {
    try {
      // Fetch a single post
      const post = await Post.findOrFail(params.id)
      return response.json(post)
    } catch (error) {
      return response.status(500).json({ error: error.message })
    }
  }
}

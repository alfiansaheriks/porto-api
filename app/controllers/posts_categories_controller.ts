import PostCategory from '#models/post_category'
import type { HttpContext } from '@adonisjs/core/http'

export default class PostsCategoriesController {
  async index({ response }: HttpContext) {
    try {
      // Fetch all posts categories
      const postsCategories = await PostCategory.all()
      return response.json(postsCategories)
    } catch (error) {
      return response.status(500).json({ error: 'Something went wrong' })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      // Create a new post category
      const postCategory = new PostCategory()
      postCategory.name = request.input('name')
      await postCategory.save()
      return response.json(postCategory)
    } catch (error) {
      return response.status(500).json({ error: 'Something went wrong' })
    }
  }

  async update({ request, response, params }: HttpContext) {
    try {
      // Update a post category
      const postCategory = await PostCategory.findOrFail(params.id)
      postCategory.name = request.input('name')
      await postCategory.save()
      return response.json(postCategory)
    } catch (error) {
      return response.status(500).json({ error: 'Something went wrong' })
    }
  }

  async destroy({ response, params }: HttpContext) {
    try {
      // Delete a post category
      const postCategory = await PostCategory.findOrFail(params.id)
      await postCategory.delete()
      return response.json({ message: 'Post category deleted' })
    } catch (error) {
      return response.status(500).json({ error: 'Something went wrong' })
    }
  }
}

import type { HttpContext } from '@adonisjs/core/http'
import ProjectCategory from '#models/project_category'
import { createCategoryValidator, updateCategoryValidator } from '#validators/category'

export default class ProjectCategoriesController {
  public async index({ response }: HttpContext) {
    try {
      const projectCategories = await ProjectCategory.all()
      return response.json(projectCategories)
    } catch (error) {
      return response.status(500).json({ error: 'Something went wrong' })
    }
  }

  public async store({ request, response }: HttpContext) {
    try {
      const data = request.body()
      const payload = await createCategoryValidator.validate(data)

      const category = await ProjectCategory.create(payload)
      return response.send(category)
    } catch (error) {
      return response.status(500).json({ error: 'Something went wrong' })
    }
  }

  public async update({ request, response, params }: HttpContext) {
    try {
      const projectCategory = await ProjectCategory.findOrFail(params.id)
      const data = request.only(['name'])
      const payload = await updateCategoryValidator.validate(data)

      projectCategory.merge(payload)
      await projectCategory.save()

      return response.json(projectCategory)
    } catch (error) {
      return response.status(500).json({ error: 'Something went wrong' })
    }
  }

  public async destroy({ response, params }: HttpContext) {
    try {
    const projectCategory = await ProjectCategory.findOrFail(params.id)

    await projectCategory.delete()

    return response.json({ message: 'Category deleted' })
    } catch (error) {
      return response.status(500).json({ error: 'Something went wrong' })
    }
  }
}

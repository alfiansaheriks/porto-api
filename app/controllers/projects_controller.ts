import type { HttpContext } from '@adonisjs/core/http'
import Project from '#models/project'

import { createProjectValidator, updateProjectValidator } from '#validators/project'

export default class ProjectsController {
  public async index({ response }: HttpContext) {
    const projects = await Project.query().orderBy('date', 'desc')

    response.json(projects)
    return projects
  }

  async show({ response, params }: HttpContext) {
    try {
      const project = await Project.findByOrFail('slug', params.slug)

      return response.json(project)
    } catch (error) {
      return response.notFound({ message: 'Project not found' })
    }
  }

  async showById({ response, params }: HttpContext) {
    try {
      const project = await Project.findOrFail(params.id)

      return response.json(project)
    } catch (error) {
      return response.notFound({ message: 'Project not found' })
    }
  }

  public async store({ response, request }: HttpContext) {
    const data = request.all()
    const payload = await createProjectValidator.validate(data)

    const project = await Project.create(payload)

    response.send(project)
    return project
  }

  async update({ request, response, params }: HttpContext) {
    try {
      const project = await Project.findOrFail(params.id)
      const data = request.all()
      const payload = await updateProjectValidator.validate(data)

      const updatedProject = await project.merge(payload).save()

      return response.json(updatedProject)
    } catch (error) {
      return response.status(500).json({ error: error.message })
    }
  }

  public async destroy({ response, params }: HttpContext) {
    try {
      const project = await Project.findOrFail(params.id)

      await project.delete()

      return response.json({ message: 'Project deleted' })
    } catch (error) {
      return response.status(500).json({ error: 'Something went wrong' })
    }
  }
}

import type { HttpContext } from '@adonisjs/core/http'
import Project from '#models/project'

import { createProjectValidator, updateProjectValidator } from '#validators/project'
import { Application } from '@adonisjs/core/app'
import app from '@adonisjs/core/services/app'
import { cuid } from '@adonisjs/core/helpers'

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

  async showByYear({ response, params }: HttpContext) {
    try {
      const projects = await Project.query()
        .where('date', 'like', `%${params.year}%`)
        .orderBy('date', 'desc')

      return response.json(projects)
    } catch (error) {
      return response.notFound({ message: 'Projects not found' })
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

  async addProjectImage({ response, request, params }: HttpContext) {
    try {
      // Temukan project berdasarkan ID
      const project = await Project.findOrFail(params.id)

      // Ambil file gambar dari request
      const image = request.file('image', {
        size: '2mb',
        extnames: ['jpg', 'png', 'jpeg'], // Batasan ekstensi yang diperbolehkan
      })

      // Validasi file gambar
      if (!image || !image.isValid) {
        return response.status(400).json({ error: 'Invalid file or format' })
      }

      // Buat nama file yang unik menggunakan `cuid`
      const fileName = `${cuid()}.${image.extname}`

      // Pindahkan file ke folder penyimpanan lokal
      await image.move(app.makePath('storage/uploads'), {
        name: fileName,
        overwrite: true,
      })

      // Simpan nama file ke dalam kolom `image` di database
      project.image = fileName
      await project.save()

      return response.json({
        message: 'Gambar berhasil disimpan',
        project,
      })
    } catch (error) {
      return response.status(500).json({ error: 'Something went wrong', details: error.message })
    }
  }

  async showImage({ response, params }: HttpContext) {
    try {
      // Temukan project berdasarkan ID
      const project = await Project.findOrFail(params.id)

      // Ambil nama file gambar
      const fileName = project.image

      // Buat path file gambar
      const filePath = app.makePath(`storage/uploads/${fileName}`)

      return response.download(filePath)
    } catch (error) {
      return response.status(404).json({ error: 'File not found' })
    }
  }
}

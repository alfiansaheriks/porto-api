import vine from '@vinejs/vine'

export const createProjectValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(5).maxLength(255),
    description: vine.string(),
    category_id: vine.number(),
    date: vine.date(),
    slug: vine.string(),
    icon: vine.string(),
  })
)

export const updateProjectValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(5).maxLength(255).optional(),
    description: vine.string().optional(),
    category_id: vine.number().optional(),
    date: vine.date().optional(),
    slug: vine.string().optional(),
    icon: vine.string().optional(),
  })
)

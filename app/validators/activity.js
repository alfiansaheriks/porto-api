import vine from '@vinejs/vine';
export const createActivityValidator = vine.compile(vine.object({
    name: vine.string().trim().minLength(3).maxLength(255),
    date: vine.string().trim().minLength(3).maxLength(255),
    icon: vine.string().trim().minLength(3).maxLength(255),
}));
export const updateActivityValidator = vine.compile(vine.object({
    name: vine.string().trim().minLength(3).maxLength(255).optional(),
    date: vine.string().trim().minLength(3).maxLength(255).optional(),
    icon: vine.string().trim().minLength(3).maxLength(255).optional(),
}));
//# sourceMappingURL=activity.js.map
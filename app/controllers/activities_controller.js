import Activity from '#models/activity';
import { createActivityValidator } from '#validators/activity';
export default class ActivitiesController {
    async index({ response }) {
        try {
            const activities = await Activity.all();
            return response.json(activities);
        }
        catch (error) {
            return response.status(500).json({ error: 'Something went wrong' });
        }
    }
    async showbyId({ response, params }) {
        try {
            const activity = await Activity.findOrFail(params.id);
            return response.json(activity);
        }
        catch (error) {
            return response.status(500).json({ error: 'Something went wrong' });
        }
    }
    async store({ request, response }) {
        try {
            const data = request.body();
            const payload = await createActivityValidator.validate(data);
            const activity = await Activity.create({
                ...payload,
                date: new Date(payload.date)
            });
            return response.send(activity);
        }
        catch (error) {
            return response.status(500).json({ error: 'Something went wrong' });
        }
    }
    async update({ request, response, params }) {
        try {
            const activity = await Activity.findOrFail(params.id);
            const data = request.only(['name', 'icon', 'date']);
            activity.merge(data);
            await activity.save();
            return response.json(activity);
        }
        catch (error) {
            return response.status(500).json({ error: 'Something went wrong' });
        }
    }
    async destroy({ response, params }) {
        try {
            const activity = await Activity.findOrFail(params.id);
            await activity.delete();
            return response.json({ message: 'Activity deleted' });
        }
        catch (error) {
            return response.status(500).json({ error: 'Something went wrong' });
        }
    }
}
//# sourceMappingURL=activities_controller.js.map
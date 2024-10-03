import User from '#models/user';
import { BaseSeeder } from '@adonisjs/lucid/seeders';
export default class extends BaseSeeder {
    async run() {
        await User.createMany([
            {
                email: 'admin@erikgat3s.com',
                password: 'rahasia',
            },
        ]);
    }
}
//# sourceMappingURL=user_seeder.js.map
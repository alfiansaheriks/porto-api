import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'projects';
    async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table.string('icon');
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1727511522400_create_add_icon_to_projects_table.js.map
import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'projects';
    async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table.string('slug').unique();
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1727327201906_create_add_slug_to_projects_table.js.map
import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'projects';
    async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table.date('date').nullable();
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1727254034122_create_add_date_to_projects_table.js.map
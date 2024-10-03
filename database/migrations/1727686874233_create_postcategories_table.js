import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'post_categories';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.string('name').notNullable();
            table.timestamp('created_at');
            table.timestamp('updated_at');
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1727686874233_create_postcategories_table.js.map
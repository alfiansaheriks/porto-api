import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'posts';
    async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table.string('icon');
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1727690754216_create_add_icontoposts_table.js.map
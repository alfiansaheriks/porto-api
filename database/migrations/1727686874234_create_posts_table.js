import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'posts';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.string('title').notNullable();
            table.text('content').notNullable();
            table.string('slug').notNullable().unique();
            table.integer('user_id').unsigned().references('id').inTable('users').onDelete;
            table.integer('category_id').unsigned().references('id').inTable('post_categories').onDelete;
            table.timestamp('created_at');
            table.timestamp('updated_at');
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1727686874234_create_posts_table.js.map
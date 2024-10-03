import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'projects'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.date('date').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

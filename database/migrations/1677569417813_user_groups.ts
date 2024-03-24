import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'user_groups'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('master_group_id').unsigned().references('master_groups.id').notNullable()
      table.integer('user_id').unsigned().references('users.id').notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

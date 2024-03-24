import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'user_gudangs'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('master_gudang_id').unsigned().references('master_gudangs.id')
      table.integer('user_id').unsigned().references('users.id')
      table.unique(['master_gudang_id', 'user_id'])
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'user_tokos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('master_toko_id').unsigned().references('master_tokos.id')
      table.integer('user_id').unsigned().references('users.id')
      table.unique(['master_toko_id', 'user_id'])
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

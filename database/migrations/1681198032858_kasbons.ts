import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'kasbons'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('users.id').notNullable()
      table.decimal('nominal_pinjaman', 12, 2).notNullable()
      table.decimal('nominal_angsuran', 12, 2).notNullable()
      table.integer('tenor').notNullable()
      table.enum('status_pinjaman', ['lunas', 'belum-lunas']).defaultTo('belum-lunas').notNullable()
      table.integer('user_id_approval').unsigned().references('users.id').notNullable()
      table.enum('status_approval', ['y', 'n', 'w']).defaultTo('w').notNullable()
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

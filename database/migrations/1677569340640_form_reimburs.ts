import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'form_reimburs'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('users.id').notNullable()
      table.date('date').notNullable()
      table.enum('category', ['rawat-jalan', 'rawat-inap', 'cek-up', 'operasional']).notNullable()
      table.string('file_receipt').notNullable()
      table.string('transaction_id').notNullable()
      table.integer('user_id_approval').unsigned().references('users.id').notNullable()
      table.enum('status_approval', ['y', 'n']).defaultTo('n').notNullable()
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

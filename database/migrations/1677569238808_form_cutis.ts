import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'form_cutis'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('users.id').notNullable()
      table.integer('remaining').notNullable()
      table.text('leave_req', 'longtext').notNullable()
      table.enum('req_type', ['once', 'range']).notNullable()
      table.date('date').notNullable()
      table.date('todate').notNullable()
      table.integer('leave_duration').notNullable()
      table.text('notes', 'longtext').nullable()
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

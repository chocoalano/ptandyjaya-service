import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'form_lemburs'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('users.id').notNullable()
      table.date('date').notNullable()
      table.time('waktu_mulai').notNullable()
      table.time('waktu_berakhir').notNullable()
      table.string('uraian_tugas').notNullable()
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

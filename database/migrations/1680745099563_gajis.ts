import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName1 = 'gajis'
  protected tableName2 = 'gaji_variables'

  public async up () {
    this.schema.createTable(this.tableName1, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned()
      table.integer('total_absen').notNullable
      table.integer('total_terlambat').notNullable
      table.integer('total_workday').notNullable
      table.string('periode',8).notNullable
      table.decimal('gaji_perbulan', 12, 2).nullable()
      table.decimal('gaji_perhari', 12, 2).nullable()
      table.decimal('gaji_thp', 12, 2).nullable()
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
    this.schema.createTable(this.tableName2, (table) => {
      table.increments('id')
      table.integer('gaji_id').unsigned().notNullable()
      table.integer('variable_gaji_id').unsigned().references('variable_gajis.id').notNullable().onDelete('CASCADE')
      table.float('bobot', 8, 2)
      table.decimal('nominal', 12, 2).nullable()
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName1)
    this.schema.dropTable(this.tableName2)
  }
}

import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('role_id').unsigned()
      table.integer('dept_id').unsigned()
      table.string('name', 255).notNullable()
      table.string('nik', 20).unique().notNullable()
      table.string('email').unique().nullable()
      table.string('password', 180).notNullable()
      table.enum('activation', ['true', 'false']).notNullable().defaultTo('false')
      table.string('avatar', 180).notNullable()
      table.enum('work_location', ['office', 'gudang', 'toko']).notNullable().defaultTo('office')
      table.integer('saldo_cuti').notNullable().defaultTo(0)
      table.string('hp', 14).nullable()
      table.enum('status', ['tetap', 'training', 'kontrak', 'magang']).notNullable().defaultTo('tetap')
      table.date('tgl_join').nullable()
      table.decimal('limit_kasbon', 12,2).nullable()
      table.decimal('total_gaji_perbulan', 12,2).nullable()

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'user_pikets'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('master_piket_id').unsigned().references('master_pikets.id')
      table.integer('dept_id').unsigned().references('depts.id')
      table.integer('role_id').unsigned().references('roles.id')
      table.integer('user_id').unsigned().references('users.id')
      table.string('time')
      table.date('date').notNullable()
      table.enum('status', ['y', 'n']).defaultTo('n').notNullable()
      table.string('img_before')
      table.string('img_after')
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

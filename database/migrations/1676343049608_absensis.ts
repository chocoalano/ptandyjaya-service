import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'absensis'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('users.id')
      table.integer('toko_id').unsigned().nullable()
      table.dateTime('jam_masuk').nullable()
      table.dateTime('jam_pulang').nullable()
      table.string('latitude_masuk').nullable()
      table.string('longitude_masuk').nullable()
      table.enum('status_masuk', ['telat', 'tidak telat']).nullable()
      table.string('waktu_telat_masuk').nullable()
      table.string('foto_selfi_masuk').nullable()
      table.string('latitude_pulang').nullable()
      table.string('longitude_pulang').nullable()
      table.string('foto_selfi_pulang').nullable()
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

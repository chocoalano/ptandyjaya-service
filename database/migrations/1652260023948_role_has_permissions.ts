import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class RoleHasPermissions extends BaseSchema {
  protected tableName = 'role_has_permissions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('role_id').unsigned().references('roles.id')
      table.integer('permission_id').unsigned().references('permissions.id')
      table.unique(['role_id', 'permission_id'])
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

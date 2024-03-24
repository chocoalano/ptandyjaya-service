import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from 'App/Models/MasterData/Role'

export default class RoleSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await Role.createMany([
      {
        rolename: 'Superadmin'
      },
      {
        rolename: 'Direktur Utama'
      },
      {
        rolename: 'Direktur Finance'
      },
      {
        rolename: 'Direktur Operasional'
      },
      {
        rolename: 'Staff Finance'
      },
      {
        rolename: 'Staff Gudang'
      },
      {
        rolename: 'Kepala Gudang'
      },
      {
        rolename: 'Wakil Kepala Gudang'
      },
      {
        rolename: 'Logistik Gudang'
      },
      {
        rolename: 'Helper Gudang'
      },
      {
        rolename: 'Kurir Gudang'
      },
      {
        rolename: 'Kepala Toko'
      },
      {
        rolename: 'Wakil Kepala Toko'
      },
      {
        rolename: 'Kasir Toko'
      },
      {
        rolename: 'Sales Toko'
      },
    ])
  }
}

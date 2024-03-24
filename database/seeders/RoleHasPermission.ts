import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import RoleHasPermission from 'App/Models/Feature/RoleHasPermission'
import Permission from 'App/Models/MasterData/Permission'

export default class RoleHasPermissionSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    const arrHasPermission: any[] = []
    const count = await Database.from('permissions').count("*")
    const total = count[0]['count(*)']
    if (total > 0) {
      const all = await Permission.all()
      all.forEach(e => {
        arrHasPermission.push({
          role_id: 1,
          permission_id: e.id
        },)
      });
      
      await RoleHasPermission.createMany(arrHasPermission)
    }
  }
}

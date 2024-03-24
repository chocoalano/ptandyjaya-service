import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Permission from 'App/Models/MasterData/Permission'

export default class PermissionSeeder extends BaseSeeder {
  public async run() {
    const actionName = ["user", "role", "permission", "dept", "mastertoko", "masteroffice", "mastergudang", "masterpelanggan", "absensi", "cuti", "izin", "lembur", "perdin", "reimburs", "jadwalgroup", "mastergroup", "usergroup", "timeconfig", "jadwalistirahat", "jadwalpiket", "gaji", "kasbon", "resign"]
    const actionPerformed = ["viewList", "view", "create", "update", "delete"]
    const arrPermission :any[] =[]
    actionName.forEach(act => {
      actionPerformed.forEach(perfom => {
        arrPermission.push({
          name:act+'-'+perfom,
          basepermission:act
        })
      });
    });
    await Permission.createMany(arrPermission)
  }
}

import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Dept from 'App/Models/MasterData/Dept'

export default class DeptSeeder extends BaseSeeder {
  public async run () {
    await Dept.createMany([
      {
        deptname: 'GENERAL'
      },
      {
        deptname: 'fINANCE'
      },
      {
        deptname: 'GUDANG'
      },
      {
        deptname: 'MARKETING'
      },
      {
        deptname: 'STORE'
      },
      {
        deptname: 'OWNER'
      },
    ])
  }
}

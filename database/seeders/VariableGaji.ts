import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import FormulaGaji from 'App/Models/Feature/FormulaGaji'
import VariableGaji from 'App/Models/Feature/VariableGaji'

export default class VariableGajiSeeder extends BaseSeeder {
  public async run () {
    await VariableGaji.createMany([
      {
        variable_name: 'Total Gaji',
        bobot:100
      },
      {
        variable_name: 'Jumlah hari perbulan',
        bobot:100
      },
      {
        variable_name: 'Total absensi perbulan',
        bobot:100
      },
    ])
    await FormulaGaji.createMany([
      {
        variable_name: 'Total Gaji',
        operator: ':'
      },
      {
        variable_name: 'Jumlah hari perbulan',
        operator: '+'
      },
      {
        variable_name: 'Total absensi perbulan',
        operator: '='
      },
    ])
  }
}

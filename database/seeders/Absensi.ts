import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import AbsensiFactory from 'Database/factories/AbsensiFactory'

export default class extends BaseSeeder {
  public async run () {
    await AbsensiFactory.createMany(500)
  }
}

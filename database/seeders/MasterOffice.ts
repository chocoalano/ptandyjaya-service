import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import MasterOffice from 'App/Models/MasterData/MasterOffice'

export default class DeptSeeder extends BaseSeeder {
  public async run() {
    await MasterOffice.createMany([
      {
        nama: 'Office Andi Jaya Acc',
        alamat: 'Jl. Citra Raya Boulevard No.09, Cikupa, Kec. Cikupa, Kabupaten Tangerang, Banten 15710',
        telepon: '(021) 22018940',
        // latitude: '-6.2327102',
        latitude: '-6.2107528',
        // longitude: '106.5191065',
        longitude: '106.5655653',
        radius_forabsen: '100',
      },
    ])
  }
}

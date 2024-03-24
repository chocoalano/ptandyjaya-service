import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import MasterGudang from 'App/Models/MasterData/MasterGudang'

export default class DeptSeeder extends BaseSeeder {
  public async run() {
    await MasterGudang.createMany([
      {
        nama: 'Gudang Andi Jaya Acc',
        alamat: 'Jl. Citra Raya Boulevard No.09, Cikupa, Kec. Cikupa, Kabupaten Tangerang, Banten 15710',
        telepon: '(021) 22018940',
        latitude: '-6.2327102',
        longitude: '106.5191065',
        radius_forabsen: '100',
      },
    ])
  }
}

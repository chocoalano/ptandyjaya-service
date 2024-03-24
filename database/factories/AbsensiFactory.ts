import Absensi from 'App/Models/Absensi'
import Factory from '@ioc:Adonis/Lucid/Factory'
import User from 'App/Models/MasterData/Users/User';
import { getRandomFromArray } from 'App/helper';

export default Factory.define(Absensi, async ({ faker }) => {
  const userArr: number[] = [];
  const tokoArr: number[] = [];

  // query
  const u = await User.all()
  const t = await User.all()

  u.forEach(e => {
    userArr.push(e.id)
  });
  t.forEach(e => {
    tokoArr.push(e.id)
  });

  return {
    user_id:getRandomFromArray(userArr),
    toko_id:getRandomFromArray(tokoArr),
    jam_masuk:faker.date.between({ from: '2024-03-01T00:00:00.000Z', to: '2024-03-30T00:00:00.000Z' }),
    jam_pulang:faker.date.between({ from: '2024-03-01T00:00:00.000Z', to: '2024-03-30T00:00:00.000Z' }),
    latitude_masuk:faker.location.latitude(),
    longitude_masuk:faker.location.longitude(),
    status_masuk:getRandomFromArray(['telat', 'tidak telat']),
    waktu_telat_masuk:'5m',
    foto_selfi_masuk:`${faker.string.alphanumeric()}.jpg`,
    latitude_pulang:faker.location.latitude(),
    longitude_pulang:faker.location.longitude(),
    foto_selfi_pulang:`${faker.string.alphanumeric()}.jpg`,
  }
}).build()

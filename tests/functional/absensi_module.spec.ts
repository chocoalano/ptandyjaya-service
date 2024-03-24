// import { test } from '@japa/runner'
// import Drive from '@ioc:Adonis/Core/Drive'
// import { file } from '@ioc:Adonis/Core/Helpers'
// import User from 'App/Models/User'

// test.group('Absensi module', () => {
//   test('absensi list test', async ({ client }) => {
//     const user = await User.findOrFail(1)
//     const sortBy = 'id'
//     const search = ''
//     const sortDesc = true
//     const page = 1
//     const limit = 10
//     const res = await client.get(`/api/absensi?page=${page}&limit=${limit}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${search}`)
//       .loginAs(user)
//     console.log(res.body());
//   })

//   test('absensi store test', async ({ client, assert }) => {
//     const user = await User.findOrFail(1)
//     const fakeDrive = Drive.fake()
//     const fakeAvatar = await file.generatePng('1mb')
//     const res = await client
//       .post('/api/absensi')
//       .fields({
//         latitude: '-6.2106098',
//         longitude: '106.565363,16z',
//         status: 'tidak telat',
//         keterangan_absen: 'masuk',
//         waktu_telat_masuk: '1 jam',
//       })
//       .file('foto_selfi', fakeAvatar.contents, { filename: fakeAvatar.name })
//       .loginAs(user)
//     assert.isFalse(await fakeDrive.exists(fakeAvatar.name))
//     Drive.restore()
//     console.log(res.body());
//   })

//   test('absensi validation test', async ({ client }) => {
//     const user = await User.findOrFail(1)
//     const res = await client
//       .post('/api/absensi')
//       .fields({
//         latitude: '',
//         longitude: '',
//         status: '',
//         keterangan_absen: '',
//         waktu_telat_masuk: '',
//       })
//       .file('foto_selfi', '', {})
//       .loginAs(user)
//     console.log(res.body());
//   })

//   test('absensi show test', async ({ client }) => {
//     const user = await User.findOrFail(1)
//     const res = await client
//       .get('/api/absensi/1')
//       .loginAs(user)
//     console.log(res.body());
//   })

//   test('absensi edit test', async ({ client }) => {
//     const user = await User.findOrFail(1)
//     const res = await client
//       .get('/api/absensi/1')
//       .loginAs(user)
//     console.log(res.body());
//   })

//   test('absensi pulang test', async ({ client, assert }) => {
//     const user = await User.findOrFail(1)
//     const fakeDrive = Drive.fake()
//     const fakeAvatar = await file.generatePng('1mb')
//     const res = await client
//       .post(`/api/absensi`)
//       .fields({
//         latitude: '-6.2106098',
//         longitude: '106.565363,16z',
//         status: 'tidak telat',
//         keterangan_absen: 'pulang',
//         waktu_telat_masuk: '1 jam',
//       })
//       .file('foto_selfi', fakeAvatar.contents, { filename: fakeAvatar.name })
//       .loginAs(user)
//       assert.isFalse(await fakeDrive.exists(fakeAvatar.name))
//     Drive.restore()
//     console.log(res.body());
//   })

//   test('absensi delete test', async ({ client }) => {
//     const user = await User.findOrFail(1)
//     const res = await client
//       .delete(`/api/absensi/${user.id}`)
//       .loginAs(user)
//     console.log(res.body());
//   })
// })

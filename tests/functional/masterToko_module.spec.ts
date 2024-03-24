// import Database from '@ioc:Adonis/Lucid/Database'
// import { test } from '@japa/runner'
// import User from 'App/Models/User'

// test.group('Master Toko module', () => {
//   test('master toko list test', async ({ client }) => {
//     const user = await User.findOrFail(1)
//     const sortBy = 'id'
//     const search = ''
//     const sortDesc = true
//     const page = 1
//     const limit = 10
//     const res = await client.get(`/api/master-toko?page=${page}&limit=${limit}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${search}`)
//       .loginAs(user)
//     console.log(res.body());
//   })

//   test('master toko store test', async ({ client }) => {
//     const user = await User.findOrFail(1)
//     const res = await client
//       .post('/api/master-toko')
//       .form({
//         nama: 'TestToko',
//         alamat: 'TestToko',
//         telepon: '081212123434',
//         latitude: -6.210600831088287,
//         longitude: 106.56538970635356,
//         radius_forabsen: 100,
//       })
//       .loginAs(user)
//     console.log(res.body());
//   })

//   test('master toko store validation test', async ({ client }) => {
//     const user = await User.findOrFail(1)
//     const res = await client
//       .post('/api/master-toko')
//       .form({
//         nama: '',
//         alamat: '',
//         telepon: '',
//         latitude: '',
//         longitude: '',
//         radius_forabsen: '',
//       })
//       .loginAs(user)
//     console.log(res.body());
//   })

//   test('master toko show test', async ({ client }) => {
//     const user = await User.findOrFail(1)
//     const res = await client
//       .get('/api/master-toko/1')
//       .loginAs(user)
//     console.log(res.body());
//   })

//   test('master toko edit test', async ({ client }) => {
//     const user = await User.findOrFail(1)
//     const res = await client
//       .get('/api/master-toko/1')
//       .loginAs(user)
//     console.log(res.body());
//   })

//   test('master toko update test', async ({ client }) => {
//     const user = await User.findOrFail(1)
//     const getdept = await Database
//       .rawQuery('select id from `master_tokos` order by id desc limit 1;')
//     const deptId = parseInt(getdept[0][0]['id'])
//     const res = await client
//       .patch(`/api/master-toko/${deptId}`)
//       .form({
//         nama: 'TestToko',
//         alamat: 'TestToko',
//         telepon: '081212123434',
//         latitude: -6.210600831088287,
//         longitude: 106.56538970635356,
//         radius_forabsen: 100,
//       })
//       .loginAs(user)
//     console.log(res.body());
//   })

//   test('master toko update validation test', async ({ client }) => {
//     const user = await User.findOrFail(1)
//     const getdept = await Database
//       .rawQuery('select id from `master_tokos` order by id desc limit 1;')
//     const deptId = parseInt(getdept[0][0]['id'])
//     const res = await client
//       .patch(`/api/master-toko/${deptId}`)
//       .form({
//         nama: '',
//         alamat: '',
//         telepon: '',
//         latitude: '',
//         longitude: '',
//         radius_forabsen: '',
//       })
//       .loginAs(user)
//     console.log(res.body());
//   })

//   test('master toko delete test', async ({ client }) => {
//     const user = await User.findOrFail(1)
//     const getdept = await Database
//       .rawQuery('select id from `master_tokos` order by id desc limit 1;')
//     const deptId = parseInt(getdept[0][0]['id'])
//     const res = await client
//       .delete(`/api/master-toko/${deptId}`)
//       .loginAs(user)
//     console.log(res.body);
//   })
// })

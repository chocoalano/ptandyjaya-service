// import Database from '@ioc:Adonis/Lucid/Database'
// import { test } from '@japa/runner'
// import User from 'App/Models/User'

// test.group('Role module', () => {
//   test('roles list test', async ({ client }) => {
//     const user = await User.findOrFail(1)
//     const sortBy = 'id'
//     const search = '1'
//     const between = '2023-01-08, 2023-02-09'
//     const sortDesc = true
//     const page = 1
//     const limit = 10
//     const res = await client.get(`/api/role?page=${page}&limit=${limit}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${search}&between=${between}`)
//     .loginAs(user)
//     console.log(res.body());
//   })

//   test('roles store test', async ({ client }) => {
//     const user = await User.findOrFail(1)
//     const res = await client
//       .post('/api/role')
//       .form({
//         rolename: 'Test',
//       })
//       .loginAs(user)
//     console.log(res.body());
//   })

//   test('roles store validation test', async ({ client }) => {
//     const user = await User.findOrFail(1)
//     const res = await client
//       .post('/api/role')
//       .form({
//         rolename: '',
//       })
//       .loginAs(user)
//     console.log(res.body());
//   })

//   test('roles show test', async ({ client }) => {
//     const user = await User.findOrFail(1)
//     const res = await client
//       .get('/api/role/1')
//       .loginAs(user)
//     console.log(res.body());
//   })

//   test('roles edit test', async ({ client }) => {
//     const user = await User.findOrFail(1)
//     const res = await client
//       .get('/api/role/1')
//       .loginAs(user)
//     console.log(res.body());
//   })

//   test('roles update test', async ({ client }) => {
//     const user = await User.findOrFail(1)
//     const res = await client
//       .patch('/api/role/1')
//       .form({
//         rolename: 'Test',
//       })
//       .loginAs(user)
//     console.log(res.body());
//   })

//   test('roles update validation test', async ({ client }) => {
//     const user = await User.findOrFail(1)
//     const res = await client
//       .patch('/api/roles/1')
//       .form({
//         rolename: '',
//       })
//       .loginAs(user)
//     console.log(res.body());
//   })

//   test('roles delete test', async ({ client }) => {
//     const user = await User.findOrFail(1)
//     const getrole = await Database
//       .rawQuery('select id from `roles` order by id desc limit 1;')
//     const roleId = parseInt(getrole[0][0]['id'])
//     const res = await client
//       .delete(`/api/roles/${roleId}`)
//       .loginAs(user)
//     console.log(res.body);
//   })
// })

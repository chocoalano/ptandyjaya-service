// import Database from '@ioc:Adonis/Lucid/Database'
// import { test } from '@japa/runner'
// import User from 'App/Models/User'

// test.group('Role module', () => {
//   test('permissions list test', async ({ client }) => {
//     const user = await User.findOrFail(1)
//     const sortBy = 'id'
//     const search = '1'
//     const between = '2023-01-08, 2023-02-09'
//     const sortDesc = true
//     const page = 1
//     const limit = 10
//     const res = await client.get(`/api/permission?page=${page}&limit=${limit}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${search}&between=${between}`)
//     .loginAs(user)
//     console.log(res.body());
//   })

//   test('permissions store test', async ({ client }) => {
//     const user = await User.findOrFail(1)
//     const res = await client
//       .post('/api/permission')
//       .form({
//          name: 'Test',
//          permission: ['create', 'read', 'update', 'delete', 'export', 'import']
//       })
//       .loginAs(user)
//     console.log(res.body());
//   })

//   test('permissions store validation test', async ({ client }) => {
//     const user = await User.findOrFail(1)
//     const res = await client
//       .post('/api/permission')
//       .form({
//          name: '',
//          permission: []
//       })
//       .loginAs(user)
//     console.log(res.body());
//   })

//   test('permissions show test', async ({ client }) => {
//     const user = await User.findOrFail(1)
//     const res = await client
//       .get('/api/permission/1')
//       .loginAs(user)
//     console.log(res.body());
//   })

//   test('permissions edit test', async ({ client }) => {
//     const user = await User.findOrFail(1)
//     const res = await client
//       .get('/api/permission/1')
//       .loginAs(user)
//     console.log(res.body());
//   })

//   test('permissions update test', async ({ client }) => {
//     const user = await User.findOrFail(1)
//     const getrole = await Database
//       .rawQuery('select id from `permissions` order by id desc limit 1;')
//     const permissionId = parseInt(getrole[0][0]['id'])
//     const res = await client
//       .patch(`/api/permission/${permissionId}`)
//       .form({
//          name: 'Test',
//          permission: ['create', 'read', 'update', 'delete', 'export', 'import']
//       })
//       .loginAs(user)
//     console.log(res.body());
//   })

//   test('permissions update validation test', async ({ client }) => {
//     const user = await User.findOrFail(1)
//     const getrole = await Database
//       .rawQuery('select id from `permissions` order by id desc limit 1;')
//     const permissionId = parseInt(getrole[0][0]['id'])
//     const res = await client
//       .patch(`/api/permission/${permissionId}`)
//       .form({
//          name: '',
//          permission: []
//       })
//       .loginAs(user)
//     console.log(res.body());
//   })

//   test('permissions delete test', async ({ client }) => {
//     const user = await User.findOrFail(1)
//     const getrole = await Database
//       .rawQuery('select id from `permissions` order by id desc limit 1;')
//     const permissionId = parseInt(getrole[0][0]['id'])
//     const res = await client
//       .delete(`/api/permission/${permissionId}`)
//       .loginAs(user)
//     console.log(res.body);
//   })
// })

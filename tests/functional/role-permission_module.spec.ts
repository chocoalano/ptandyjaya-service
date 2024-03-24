// import Database from '@ioc:Adonis/Lucid/Database'
// import { test } from '@japa/runner'
// import User from 'App/Models/User'

// test.group('Role module', () => {
//   test('role-permissions list test', async ({ client }) => {
//     const user = await User.findOrFail(1)
//     const sortBy = 'id'
//     const search = '1'
//     const between = '2023-01-08, 2023-02-09'
//     const sortDesc = true
//     const page = 1
//     const limit = 10
//     const res = await client.get(`/api/role-permission?page=${page}&limit=${limit}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${search}&between=${between}`)
//       .loginAs(user)
//     console.log(res.body());
//   })

//   test('role-permissions store test', async ({ client }) => {
//     const user = await User.findOrFail(1)
//     const res = await client
//       .post('/api/role-permission')
//       .form({
//         role_id: 6, permission_id: [ 16, 15, 14, 13 ]
//       })
//       .loginAs(user)
//     console.log(res.body());
//   })

//   test('role-permissions store validation test', async ({ client }) => {
//     const user = await User.findOrFail(1)
//     const res = await client
//       .post('/api/role-permission')
//       .form({
//         role_id: null, permission_id: [ ]
//       })
//       .loginAs(user)
//     console.log(res.body());
//   })

//   test('role-permissions show test', async ({ client }) => {
//     const user = await User.findOrFail(1)
//     const res = await client
//       .get('/api/role-permission/1')
//       .loginAs(user)
//     console.log(res.body());
//   })

//   test('role-permissions edit test', async ({ client }) => {
//     const user = await User.findOrFail(1)
//     const res = await client
//       .get('/api/role-permission/1')
//       .loginAs(user)
//     console.log(res.body());
//   })

//   test('role-permissions update test', async ({ client }) => {
//     const user = await User.findOrFail(1)
//     const getdept = await Database
//       .rawQuery('select id from `role_has_permissions` order by role_id desc limit 1;')
//     const deptId = parseInt(getdept[0][0]['id'])
//     const res = await client
//       .patch(`/api/role-permission/${deptId}`)
//       .form({
//         role_id: 6, permission_id: [ 16, 15, 14, 13 ]
//       })
//       .loginAs(user)
//     console.log(res.body());
//   })

//   test('role-permissions update validation test', async ({ client }) => {
//     const user = await User.findOrFail(1)
//     const getdept = await Database
//       .rawQuery('select id from `role_has_permissions` order by role_id desc limit 1;')
//     const deptId = parseInt(getdept[0][0]['id'])
//     const res = await client
//       .patch(`/api/role-permission/${deptId}`)
//       .form({
//         role_id: null, permission_id: [ ]
//       })
//       .loginAs(user)
//     console.log(res.body());
//   })

//   test('role-permissions delete test', async ({ client }) => {
//     const user = await User.findOrFail(1)
//     const getdept = await Database
//       .rawQuery('select id from `role_has_permissions` order by id desc limit 1;')
//     const deptId = parseInt(getdept[0][0]['id'])
//     const res = await client
//       .delete(`/api/role-permission/${deptId}`)
//       .loginAs(user)
//     console.log(res.body);
//   })
// })

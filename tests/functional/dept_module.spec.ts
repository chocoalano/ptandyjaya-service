// import Database from '@ioc:Adonis/Lucid/Database'
// import { test } from '@japa/runner'
// import User from 'App/Models/User'

// test.group('Dept module', () => {
//   test('depts list test', async ({ client }) => {
//     const user = await User.findOrFail(1)
//     const sortBy = 'id'
//     const search = '1'
//     const between = '2023-01-08, 2023-02-09'
//     const sortDesc = true
//     const page = 1
//     const limit = 10
//     const res = await client.get(`/api/dept?page=${page}&limit=${limit}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${search}&between=${between}`)
//       .loginAs(user)
//     console.log(res.body());
//   })

//   test('depts store test', async ({ client }) => {
//     const user = await User.findOrFail(1)
//     const res = await client
//       .post('/api/dept')
//       .form({
//         deptname: 'Test',
//       })
//       .loginAs(user)
//     console.log(res.body());
//   })

//   test('depts store validation test', async ({ client }) => {
//     const user = await User.findOrFail(1)
//     const res = await client
//       .post('/api/dept')
//       .form({
//         deptname: '',
//       })
//       .loginAs(user)
//     console.log(res.body());
//   })

//   test('depts show test', async ({ client }) => {
//     const user = await User.findOrFail(1)
//     const res = await client
//       .get('/api/dept/1')
//       .loginAs(user)
//     console.log(res.body());
//   })

//   test('depts edit test', async ({ client }) => {
//     const user = await User.findOrFail(1)
//     const res = await client
//       .get('/api/dept/1')
//       .loginAs(user)
//     console.log(res.body());
//   })

//   test('depts update test', async ({ client }) => {
//     const user = await User.findOrFail(1)
//     const getdept = await Database
//       .rawQuery('select id from `depts` order by id desc limit 1;')
//     const deptId = parseInt(getdept[0][0]['id'])
//     const res = await client
//       .patch(`/api/dept/${deptId}`)
//       .form({
//         deptname: 'Test',
//       })
//       .loginAs(user)
//     console.log(res.body());
//   })

//   test('depts update validation test', async ({ client }) => {
//     const user = await User.findOrFail(1)
//     const getdept = await Database
//       .rawQuery('select id from `depts` order by id desc limit 1;')
//     const deptId = parseInt(getdept[0][0]['id'])
//     const res = await client
//       .patch(`/api/dept/${deptId}`)
//       .form({
//         deptname: '',
//       })
//       .loginAs(user)
//     console.log(res.body());
//   })

//   test('depts delete test', async ({ client }) => {
//     const user = await User.findOrFail(1)
//     const getdept = await Database
//       .rawQuery('select id from `depts` order by id desc limit 1;')
//     const deptId = parseInt(getdept[0][0]['id'])
//     const res = await client
//       .delete(`/api/dept/${deptId}`)
//       .loginAs(user)
//     console.log(res.body);
//   })
// })

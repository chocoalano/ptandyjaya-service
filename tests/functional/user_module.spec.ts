// import { test } from '@japa/runner'
// import Drive from '@ioc:Adonis/Core/Drive'
// import { file } from '@ioc:Adonis/Core/Helpers'
// import User from 'App/Models/User'

// test.group('User module', () => {
//   test('users list test', async ({ client }) => {
//     const user = await User.findOrFail(1)
//     const sortBy = 'id'
//     const search = '1'
//     const between = '2023-01-08, 2023-02-09'
//     const sortDesc = true
//     const page = 1
//     const limit = 10
//     const res = await client.get(`/api/users?page=${page}&limit=${limit}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${search}&between=${between}`)
//       .loginAs(user)
//     console.log(res.body());
//   })

//   test('users store test', async ({ client, assert }) => {
//     const fakeDrive = Drive.fake()
//     const fakeAvatar = await file.generatePng('1mb')
//     const user = await User.findOrFail(1)
//     const res = await client
//       .post('/api/users')
//       .fields({
//         role_id: 1,
//         dept_id: 1,
//         name: 'Test',
//         email: 'Test@test.test',
//         nik: '002',
//         password: '123456',
//         password_confirmation: '123456',
//         work_location: 'office',
//         saldo_cuti: 0,
//         activation: 'true'
//       })
//       .file('avatar', fakeAvatar.contents, { filename: fakeAvatar.name })
//       .loginAs(user)
//     assert.isFalse(await fakeDrive.exists(fakeAvatar.name))
//     Drive.restore()
//     console.log(res.body());
//   })

//   test('users store validation test', async ({ client, assert }) => {
//     const user = await User.findOrFail(1)
//     const res = await client
//       .post('/api/users')
//       .fields({
//         role_id: '',
//         dept_id: '',
//         name: '',
//         email: '',
//         password: '',
//         password_confirmation: '',
//         nik: '',
//         activation: '',
//         work_location: '',
//         saldo_cuti: '',
//       })
//       .file('avatar', '', '')
//       .loginAs(user)
//     console.log(res.body());
//   })

//   test('users show test', async ({ client }) => {
//     const user = await User.findOrFail(1)
//     const res = await client
//       .get('/api/users/1')
//       .loginAs(user)
//     console.log(res.body());
//   })

//   test('users edit test', async ({ client }) => {
//     const user = await User.findOrFail(1)
//     const res = await client
//       .get('/api/users/1')
//       .loginAs(user)
//     console.log(res.body());
//   })

//   test('users update test', async ({ client, assert }) => {
//     const fakeDrive = Drive.fake()
//     const fakeAvatar = await file.generatePng('1mb')
//     const user = await User.findOrFail(1)
//     const res = await client
//       .patch('/api/users/1')
//       .fields({
//         role_id: user.role_id,
//         dept_id: user.dept_id,
//         name: user.name,
//         email: user.email,
//         password: '123456',
//         password_confirmation: '123456',
//         nik: user.nik,
//         activation: user.activation,
//         work_location: user.work_location,
//         saldo_cuti: user.saldo_cuti,
//       })
//       .file('avatar', fakeAvatar.contents, { filename: fakeAvatar.name })
//       .loginAs(user)
//     assert.isFalse(await fakeDrive.exists(fakeAvatar.name))
//     Drive.restore()
//     console.log(res.body());
//   })

//   test('users update validation test', async ({ client }) => {
//     const user = await User.findOrFail(1)
//     const res = await client
//       .patch('/api/users/1')
//       .fields({
//         role_id: '',
//         dept_id: '',
//         name: '',
//         email: '',
//         password: '',
//         password_confirmation: '',
//         nik: '',
//         activation: '',
//         work_location: '',
//         saldo_cuti: '',
//       })
//       .file('avatar', '', '')
//       .loginAs(user)
//     console.log(res.body());
//   })

//   test('users delete test', async ({ client }) => {
//     const user = await User.findOrFail(1)
//     const res = await client
//       .delete('/api/users/8')
//       .loginAs(user)
//     console.log(res.body());
//   })
// })

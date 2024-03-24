// import { test } from '@japa/runner'
// import Drive from '@ioc:Adonis/Core/Drive'
// import { file } from '@ioc:Adonis/Core/Helpers'
// import User from 'App/Models/User'


// test.group('Auth module', () => {
//   test('register test', async ({ client, assert }) => {
//     const fakeDrive = Drive.fake()
//     const fakeAvatar = await file.generatePng('1mb')
//     const res = await client
//       .post('/api/register')
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
//     assert.isFalse(await fakeDrive.exists(fakeAvatar.name))
//     Drive.restore()
//     console.log(res.body());
//   })

//   test('login test', async ({ client }) => {
//     const res = await client.post('/api/login').form({
//       email: 'Test@test.test',
//       password: '123456'
//     })
//     console.log(res.body());
//   })

//   test('auth profile test', async ({ client }) => {
//     const user = await User.findOrFail(1)
//     const res = await client.get('/api/profile').loginAs(user)
//     console.log(res.body());
//   })

//   test('auth profile update not password & avatar test', async ({ client }) => {
//     const user = await User.findOrFail(1)
//     const res = await client.post('/api/profile-update')
//       .loginAs(user)
//       .form({
//         role_id: user.role_id,
//         dept_id: user.dept_id,
//         name: user.name,
//         email: user.email,
//         nik: user.nik,
//         activation: user.activation,
//         work_location: user.work_location,
//         saldo_cuti: user.saldo_cuti,
//       })
//     console.log(res.body());
//   })

//   test('auth profile update with password not avatar test', async ({ client }) => {
//     const user = await User.findOrFail(1)
//     const res = await client.post('/api/profile-update')
//       .loginAs(user)
//       .form({
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
//     console.log(res.body());
//   })

//   test('auth profile update not password with avatar test', async ({ client, assert }) => {
//     const fakeDrive = Drive.fake()
//     const fakeAvatar = await file.generatePng('1mb')
//     const user = await User.findOrFail(1)
//     const res = await client.post('/api/profile-update')
//       .loginAs(user)
//       .fields({
//         role_id: user.role_id,
//         dept_id: user.dept_id,
//         name: user.name,
//         email: user.email,
//         nik: user.nik,
//         activation: user.activation,
//         work_location: user.work_location,
//         saldo_cuti: user.saldo_cuti,
//       })
//       .file('avatar', fakeAvatar.contents, { filename: fakeAvatar.name })
//     assert.isFalse(await fakeDrive.exists(fakeAvatar.name))
//     Drive.restore()
//     console.log(res.body());
//   })

//   test('auth profile update with avatar & password test', async ({ client, assert }) => {
//     const fakeDrive = Drive.fake()
//     const fakeAvatar = await file.generatePng('1mb')
//     const user = await User.findOrFail(1)
//     const res = await client.post('/api/profile-update')
//       .loginAs(user)
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
//     assert.isFalse(await fakeDrive.exists(fakeAvatar.name))
//     Drive.restore()
//     console.log(res.body());
//   })

//   test('auth logout test', async ({ client }) => {
//     const user = await User.findOrFail(1)
//     const res = await client.post('/api/logout').loginAs(user)
//     console.log(res.body());
//   })
// })

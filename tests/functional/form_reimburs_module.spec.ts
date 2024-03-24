// import { test } from '@japa/runner'
// import User from 'App/Models/User'
// import Drive from '@ioc:Adonis/Core/Drive'
// import { file } from '@ioc:Adonis/Core/Helpers'

// test.group('FORM REIMBURS module', () => {
//     test('form-reimburs list test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const sortBy = 'id'
//         const search = '1'
//         const sortDesc = true
//         const page = 1
//         const limit = 10
//         const res = await client.get(`/api/form-reimburs?page=${page}&limit=${limit}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${search}`)
//             .loginAs(user)
//         console.log(res.body());
//     })

//     test('form-reimburs store test', async ({ client, assert }) => {
//         const fakeDrive = Drive.fake()
//         const fakeAvatar = await file.generatePng('1mb')
//         const user = await User.findOrFail(1)
//         const res = await client
//             .post('/api/form-reimburs')
//             .fields({
//                 user_id: user.id,
//                 date: '2023-03-01',
//                 category: 'rawat-jalan',
//                 user_id_approval: user.id,
//                 status_approval: 'n',
//             })
//             .file('file_receipt', fakeAvatar.contents, { filename: fakeAvatar.name })
//             .loginAs(user)
//         assert.isFalse(await fakeDrive.exists(fakeAvatar.name))
//         Drive.restore()
//         console.log(res.body());
//     })

//     test('form-reimburs store validation test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const res = await client
//             .post('/api/form-reimburs')
//             .fields({
//                 user_id: '',
//                 date: '',
//                 category: '',
//                 user_id_approval: '',
//                 status_approval: '',
//             })
//             .file('file_receipt', '', { filename: '' })
//             .loginAs(user)
//         console.log(res.body());
//     })

//     test('form-reimburs show test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const res = await client
//             .get('/api/form-reimburs/1')
//             .loginAs(user)
//         console.log(res.body());
//     })

//     test('form-reimburs edit test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const res = await client
//             .get('/api/form-reimburs/1')
//             .loginAs(user)
//         console.log(res.body());
//     })

//     test('form-reimburs update test', async ({ client, assert }) => {
//         const fakeDrive = Drive.fake()
//         const fakeAvatar = await file.generatePng('1mb')
//         const user = await User.findOrFail(1)
//         const res = await client
//             .patch('/api/form-reimburs/1')
//             .fields({
//                 user_id: user.id,
//                 date: '2023-03-01',
//                 category: 'rawat-jalan',
//                 user_id_approval: user.id,
//                 status_approval: 'n',
//             })
//             .file('file_receipt', fakeAvatar.contents, { filename: fakeAvatar.name })
//             .loginAs(user)
//         assert.isFalse(await fakeDrive.exists(fakeAvatar.name))
//         Drive.restore()
//         console.log(res.body());
//     })

//     test('form-reimburs update validation test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const res = await client
//             .patch('/api/form-reimburs/1')
//             .fields({
//                 user_id: '',
//                 date: '',
//                 category: '',
//                 user_id_approval: '',
//                 status_approval: '',
//             })
//             .file('file_receipt', '', { filename: '' })
//             .loginAs(user)
//         console.log(res.body());
//     })

//     test('form-reimburs delete test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const res = await client
//             .delete('/api/form-reimburs/2')
//             .loginAs(user)
//         console.log(res.body());
//     })
//     test('form-reimburs approval test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const res = await client
//             .put('/api/form-reimburs/approval/1')
//             .loginAs(user)
//         console.log(res.body());
//     })
// })

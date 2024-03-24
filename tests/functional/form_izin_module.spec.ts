// import { test } from '@japa/runner'
// import User from 'App/Models/User'
// import Drive from '@ioc:Adonis/Core/Drive'
// import { file } from '@ioc:Adonis/Core/Helpers'

// test.group('FORM IZIN module', () => {
//     test('form-izin list test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const sortBy = 'id'
//         const search = '1'
//         const sortDesc = true
//         const page = 1
//         const limit = 10
//         const res = await client.get(`/api/form-izin?page=${page}&limit=${limit}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${search}`)
//             .loginAs(user)
//         console.log(res.body());
//     })

//     test('form-izin store test come-to-late', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const res = await client
//             .post('/api/form-izin')
//             .form({
//                 user_id: user.id,
//                 permit_req: 'come-to-late',
//                 req_type: 'once',
//                 date: '2023-03-01',
//                 todate: '2023-03-01',
//                 leave_duration: 1,
//                 notes: 'testing',
//                 user_id_approval: user.id,
//                 status_approval: 'n',
//             })
//             .loginAs(user)
//         console.log(res.body());
//     })
//     test('form-izin store test sick', async ({ client, assert }) => {
        // const fakeDrive = Drive.fake()
        // const fakeAvatar = await file.generatePng('1mb')
//         const user = await User.findOrFail(1)
//         const res = await client
//             .post('/api/form-izin')
//             .fields({
//                 user_id: user.id,
//                 permit_req: 'sick',
//                 req_type: 'once',
//                 date: '2023-03-01',
//                 todate: '2023-03-01',
//                 leave_duration: 1,
//                 notes: 'testing',
//                 user_id_approval: user.id,
//                 status_approval: 'n',
//             })
//             .file('file', fakeAvatar.contents, { filename: fakeAvatar.name })
//             .loginAs(user)
        // assert.isFalse(await fakeDrive.exists(fakeAvatar.name))
        // Drive.restore()
//         console.log(res.body());
//     })
//     test('form-izin store test not-present', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const res = await client
//             .post('/api/form-izin')
//             .form({
//                 user_id: user.id,
//                 permit_req: 'not-present',
//                 req_type: 'once',
//                 date: '2023-03-01',
//                 todate: '2023-03-01',
//                 leave_duration: 1,
//                 notes: 'testing',
//                 user_id_approval: user.id,
//                 status_approval: 'n',
//             })
//             .loginAs(user)
//         console.log(res.body());
//     })
//     test('form-izin store test other', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const res = await client
//             .post('/api/form-izin')
//             .form({
//                 user_id: user.id,
//                 permit_req: 'other',
//                 req_type: 'once',
//                 date: '2023-03-01',
//                 todate: '2023-03-01',
//                 leave_duration: 1,
//                 notes: 'testing',
//                 user_id_approval: user.id,
//                 status_approval: 'n',
//             })
//             .loginAs(user)
//         console.log(res.body());
//     })

//     test('form-izin store validation test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const res = await client
//             .post('/api/form-izin')
//             .form({
//                 user_id: '',
//                 permit_req: '',
//                 req_type: '',
//                 date: '',
//                 todate: '',
//                 leave_duration: '',
//                 notes: '',
//                 user_id_approval: '',
//                 status_approval: '',
//             })
//             .loginAs(user)
//         console.log(res.body());
//     })

//     test('form-izin show test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const res = await client
//             .get('/api/form-izin/1')
//             .loginAs(user)
//         console.log(res.body());
//     })

//     test('form-izin edit test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const res = await client
//             .get('/api/form-izin/1')
//             .loginAs(user)
//         console.log(res.body());
//     })

//     test('form-izin update test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const res = await client
//             .patch('/api/form-izin/1')
//             .form({
//                 user_id: user.id,
//                 permit_req: 'not-present',
//                 req_type: 'once',
//                 date: '2023-03-01',
//                 todate: '2023-03-01',
//                 leave_duration: 1,
//                 notes: 'testing',
//                 user_id_approval: user.id,
//                 status_approval: 'n',
//             })
//             .loginAs(user)
//         console.log(res.body());
//     })

//     test('form-izin update validation test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const res = await client
//             .patch('/api/form-izin/1')
//             .form({
//                 user_id: '',
//                 permit_req: '',
//                 req_type: '',
//                 date: '',
//                 todate: '',
//                 leave_duration: '',
//                 notes: '',
//                 user_id_approval: '',
//                 status_approval: '',
//             })
//             .loginAs(user)
//         console.log(res.body());
//     })

//     test('form-izin delete test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const res = await client
//             .delete('/api/form-izin/2')
//             .loginAs(user)
//         console.log(res.body());
//     })
//     test('form-izin approval test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const res = await client
//             .put('/api/form-izin/approval/3')
//             .loginAs(user)
//         console.log(res.body());
//     })
// })

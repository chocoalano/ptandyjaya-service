// import { test } from '@japa/runner'
// import User from 'App/Models/User'

// test.group('FORM CUTI module', () => {
//     test('form-cuti list test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const sortBy = 'id'
//         const search = '1'
//         const sortDesc = true
//         const page = 1
//         const limit = 10
//         const res = await client.get(`/api/form-cuti?page=${page}&limit=${limit}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${search}`)
//             .loginAs(user)
//         console.log(res.body());
//     })

//     test('form-cuti store test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const res = await client
//             .post('/api/form-cuti')
//             .form({
//                 user_id: user.id,
//                 remaining: 1,
//                 leave_req: 'testing',
//                 req_type: 'range',
//                 date: '2023-03-01',
//                 todate: '2023-03-07',
//                 leave_duration: 1,
//                 notes: 'testing',
//                 user_id_approval: user.id,
//                 status_approval: 'n',
//             })
//             .loginAs(user)
//         console.log(res.body());
//     })

//     test('form-cuti store validation test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const res = await client
//             .post('/api/form-cuti')
//             .form({
//                 user_id: '',
//                 remaining: '',
//                 leave_req: '',
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

//     test('form-cuti show test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const res = await client
//             .get('/api/form-cuti/1')
//             .loginAs(user)
//         console.log(res.body());
//     })

//     test('form-cuti edit test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const res = await client
//             .get('/api/form-cuti/1')
//             .loginAs(user)
//         console.log(res.body());
//     })

//     test('form-cuti update test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const res = await client
//             .patch('/api/form-cuti/1')
//             .form({
//                 user_id: user.id,
//                 remaining: 1,
//                 leave_req: 'testing',
//                 req_type: 'range',
//                 date: '2023-03-01',
//                 todate: '2023-03-07',
//                 leave_duration: 1,
//                 notes: 'testing',
//                 user_id_approval: user.id,
//                 status_approval: 'n',
//             })
//             .loginAs(user)
//         console.log(res.body());
//     })

//     test('form-cuti update validation test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const res = await client
//             .patch('/api/form-cuti/1')
//             .form({
//                 user_id: '',
//                 remaining: '',
//                 leave_req: '',
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

//     test('form-cuti delete test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const res = await client
//             .delete('/api/form-cuti/2')
//             .loginAs(user)
//         console.log(res.body());
//     })
//     test('form-cuti approval test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const res = await client
//             .put('/api/form-cuti/approval/3')
//             .loginAs(user)
//         console.log(res.body());
//     })
// })

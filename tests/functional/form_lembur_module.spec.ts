// import { test } from '@japa/runner'
// import User from 'App/Models/User'

// test.group('FORM LEMBUR module', () => {
//     test('form-lembur list test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const sortBy = 'id'
//         const search = '1'
//         const sortDesc = true
//         const page = 1
//         const limit = 10
//         const res = await client.get(`/api/form-lembur?page=${page}&limit=${limit}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${search}`)
//             .loginAs(user)
//         console.log(res.body());
//     })

//     test('form-lembur store test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const res = await client
//             .post('/api/form-lembur')
//             .form({
//                 user_id: user.id,
//                 date: '2023-03-01',
//                 waktu_mulai: '53:30:21',
//                 waktu_berakhir: '53:40:21',
//                 uraian_tugas: 'testing',
//                 user_id_approval: user.id,
//                 status_approval: 'n',
//             })
//             .loginAs(user)
//         console.log(res.body());
//     })

//     test('form-lembur store validation test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const res = await client
//             .post('/api/form-lembur')
//             .form({
//                 user_id: '',
//                 date: '',
//                 waktu_mulai: '',
//                 waktu_berakhir: '',
//                 uraian_tugas: '',
//                 user_id_approval: '',
//                 status_approval: '',
//             })
//             .loginAs(user)
//         console.log(res.body());
//     })

//     test('form-lembur show test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const res = await client
//             .get('/api/form-lembur/1')
//             .loginAs(user)
//         console.log(res.body());
//     })

//     test('form-lembur edit test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const res = await client
//             .get('/api/form-lembur/1')
//             .loginAs(user)
//         console.log(res.body());
//     })

//     test('form-lembur update test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const res = await client
//             .patch('/api/form-lembur/1')
//             .form({
//                 user_id: user.id,
//                 date: '2023-03-01',
//                 waktu_mulai: '53:30:21',
//                 waktu_berakhir: '53:40:21',
//                 uraian_tugas: 'testing',
//                 user_id_approval: user.id,
//                 status_approval: 'n',
//             })
//             .loginAs(user)
//         console.log(res.body());
//     })

//     test('form-lembur update validation test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const res = await client
//             .patch('/api/form-lembur/1')
//             .form({
//                 user_id: '',
//                 date: '',
//                 waktu_mulai: '',
//                 waktu_berakhir: '',
//                 uraian_tugas: '',
//                 user_id_approval: '',
//                 status_approval: '',
//             })
//             .loginAs(user)
//         console.log(res.body());
//     })

//     test('form-lembur delete test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const res = await client
//             .delete('/api/form-lembur/2')
//             .loginAs(user)
//         console.log(res.body());
//     })
//     test('form-lembur approval test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const res = await client
//             .put('/api/form-lembur/approval/1')
//             .loginAs(user)
//         console.log(res.body());
//     })
// })

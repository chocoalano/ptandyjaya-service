// import { test } from '@japa/runner'
// import User from 'App/Models/User'

// test.group('FORM PERDIN module', () => {
//     test('form-perdin list test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const sortBy = 'id'
//         const search = '1'
//         const sortDesc = true
//         const page = 1
//         const limit = 10
//         const res = await client.get(`/api/form-perdin?page=${page}&limit=${limit}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${search}`)
//             .loginAs(user)
//         console.log(res.body());
//     })

//     test('form-perdin store test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const res = await client
//             .post('/api/form-perdin')
//             .form({
//                 user_id: user.id,
//                 tempat_tujuan: 'testing tempat',
//                 tgl_brangkat: '2023-03-01',
//                 tgl_kembali: '2023-03-01',
//                 tujuan_perdin: 'tugas kerja',
//                 user_id_approval: user.id,
//                 status_approval: 'n',
//             })
//             .loginAs(user)
//         console.log(res.body());
//     })

//     test('form-perdin store validation test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const res = await client
//             .post('/api/form-perdin')
//             .form({
//                 user_id: '',
//                 tempat_tujuan: '',
//                 tgl_brangkat: '',
//                 tgl_kembali: '',
//                 tujuan_perdin: '',
//                 user_id_approval: '',
//                 status_approval: '',
//             })
//             .loginAs(user)
//         console.log(res.body());
//     })

//     test('form-perdin show test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const res = await client
//             .get('/api/form-perdin/1')
//             .loginAs(user)
//         console.log(res.body());
//     })

//     test('form-perdin edit test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const res = await client
//             .get('/api/form-perdin/1')
//             .loginAs(user)
//         console.log(res.body());
//     })

//     test('form-perdin update test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const res = await client
//             .patch('/api/form-perdin/1')
//             .form({
//                 user_id: user.id,
//                 tempat_tujuan: 'testing tempat',
//                 tgl_brangkat: '2023-03-01',
//                 tgl_kembali: '2023-03-01',
//                 tujuan_perdin: 'tugas kerja',
//                 user_id_approval: user.id,
//                 status_approval: 'n',
//             })
//             .loginAs(user)
//         console.log(res.body());
//     })

//     test('form-perdin update validation test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const res = await client
//             .patch('/api/form-perdin/1')
//             .form({
//                 user_id: '',
//                 tempat_tujuan: '',
//                 tgl_brangkat: '',
//                 tgl_kembali: '',
//                 tujuan_perdin: '',
//                 user_id_approval: '',
//                 status_approval: '',
//             })
//             .loginAs(user)
//         console.log(res.body());
//     })

//     test('form-perdin delete test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const res = await client
//             .delete('/api/form-perdin/2')
//             .loginAs(user)
//         console.log(res.body());
//     })
//     test('form-perdin approval test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const res = await client
//             .put('/api/form-perdin/approval/1')
//             .loginAs(user)
//         console.log(res.body());
//     })
// })

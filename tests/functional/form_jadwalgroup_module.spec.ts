// import { test } from '@japa/runner'
// import User from 'App/Models/User'

// test.group('FORM JADWAL GROUP module', () => {
//     test('jadwal-group list test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const sortBy = 'id'
//         const search = '1'
//         const sortDesc = true
//         const page = 1
//         const limit = 10
//         const res = await client.get(`/api/jadwal-group?page=${page}&limit=${limit}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${search}`)
//             .loginAs(user)
//         console.log(res.body());
//     })

//     test('jadwal-group store test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const res = await client
//             .post('/api/jadwal-group')
//             .form({
//                 master_group_id: 1,
//                 time_config_id: 1,
//                 date: '2023-03-01',
//             })
//             .loginAs(user)
//         console.log(res.body());
//     })

//     test('jadwal-group store validation test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const res = await client
//             .post('/api/jadwal-group')
//             .form({
//                 master_group_id: '',
//                 time_config_id: '',
//                 date: '',
//             })
//             .loginAs(user)
//         console.log(res.body());
//     })

//     test('jadwal-group show test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const res = await client
//             .get('/api/jadwal-group/1')
//             .loginAs(user)
//         console.log(res.body());
//     })

//     test('jadwal-group edit test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const res = await client
//             .get('/api/jadwal-group/1')
//             .loginAs(user)
//         console.log(res.body());
//     })

//     test('jadwal-group update test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const res = await client
//             .patch('/api/jadwal-group/1')
//             .form({
//                 master_group_id: 1,
//                 time_config_id: 1,
//                 date: '2023-03-01',
//             })
//             .loginAs(user)
//         console.log(res.body());
//     })

//     test('jadwal-group update validation test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const res = await client
//             .patch('/api/jadwal-group/1')
//             .form({
//                 master_group_id: '',
//                 time_config_id: '',
//                 date: '',
//             })
//             .loginAs(user)
//         console.log(res.body());
//     })

//     test('jadwal-group delete test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const res = await client
//             .delete('/api/jadwal-group/2')
//             .loginAs(user)
//         console.log(res.body());
//     })
// })

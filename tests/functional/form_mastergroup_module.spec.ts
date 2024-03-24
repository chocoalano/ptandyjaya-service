// import { test } from '@japa/runner'
// import User from 'App/Models/User'

// test.group('FORM MASTER GROUP module', () => {
//     test('jadwal-group list test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const sortBy = 'id'
//         const search = '1'
//         const sortDesc = true
//         const page = 1
//         const limit = 10
//         const res = await client.get(`/api/master-group?page=${page}&limit=${limit}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${search}`)
//             .loginAs(user)
//         console.log(res.body());
//     })

//     test('jadwal-group store test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const res = await client
//             .post('/api/master-group')
//             .form({
//                 user_id_kepgroup: 1,
//                 nama: 'testing',
//             })
//             .loginAs(user)
//         console.log(res.body());
//     })

//     test('jadwal-group store validation test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const res = await client
//             .post('/api/master-group')
//             .form({
//                 user_id_kepgroup: 1,
//                 nama: 'testing',
//             })
//             .loginAs(user)
//         console.log(res.body());
//     })

//     test('jadwal-group show test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const res = await client
//             .get('/api/master-group/1')
//             .loginAs(user)
//         console.log(res.body());
//     })

//     test('jadwal-group edit test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const res = await client
//             .get('/api/master-group/1')
//             .loginAs(user)
//         console.log(res.body());
//     })

//     test('jadwal-group update test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const res = await client
//             .patch('/api/master-group/1')
//             .form({
//                 user_id_kepgroup: 1,
//                 nama: 'testing',
//             })
//             .loginAs(user)
//         console.log(res.body());
//     })

//     test('jadwal-group update validation test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const res = await client
//             .patch('/api/master-group/1')
//             .form({
//                 user_id_kepgroup: 1,
//                 nama: 'testing',
//             })
//             .loginAs(user)
//         console.log(res.body());
//     })

//     test('jadwal-group delete test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const res = await client
//             .delete('/api/master-group/2')
//             .loginAs(user)
//         console.log(res.body());
//     })
// })

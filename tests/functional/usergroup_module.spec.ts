// import { test } from '@japa/runner'
// import User from 'App/Models/User'

// test.group('USER GROUP module', () => {
//     test('user-group list test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const sortDesc = true
//         const page = 1
//         const limit = 10
//         const res = await client.get(`/api/user-group?page=${page}&limit=${limit}&sortDesc=${sortDesc}`)
//             .loginAs(user)
//         console.log(res.body());
//     })

//     test('user-group store test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const res = await client
//             .post('/api/user-group')
//             .form({
//                 master_group_id: 1, user_id: [1]
//             })
//             .loginAs(user)
//         console.log(res.body());
//     })

//     test('user-group store validation test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const res = await client
//             .post('/api/user-group')
//             .form({
//                 master_group_id: null, user_id: []
//             })
//             .loginAs(user)
//         console.log(res.body());
//     })

//     test('user-group show test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const res = await client
//             .get('/api/user-group/1')
//             .loginAs(user)
//         console.log(res.body());
//     })

//     test('user-group edit test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const res = await client
//             .get('/api/user-group/1')
//             .loginAs(user)
//         console.log(res.body());
//     })

//     test('user-group update test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const res = await client
//             .patch(`/api/user-group/${1}`)
//             .form({
//                 master_group_id: 1, user_id: [1]
//             })
//             .loginAs(user)
//         console.log(res.body());
//     })

//     test('user-group update validation test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const res = await client
//             .patch(`/api/user-group/${1}`)
//             .form({
//                 master_group_id: null, user_id: []
//             })
//             .loginAs(user)
//         console.log(res.body());
//     })

//     test('user-group delete test', async ({ client }) => {
//         const user = await User.findOrFail(1)
//         const res = await client
//             .delete(`/api/user-group/${1}`)
//             .loginAs(user)
//         console.log(res.body);
//     })
// })

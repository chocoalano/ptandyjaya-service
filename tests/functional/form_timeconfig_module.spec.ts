import { test } from '@japa/runner'
import User from 'App/Models/MasterData/Users/User'

test.group('FORM TIME CONFIG module', () => {
    test('time-config list test', async ({ client }) => {
        const user = await User.findOrFail(1)
        const sortBy = 'id'
        const search = '1'
        const sortDesc = true
        const page = 1
        const limit = 10
        const res = await client.get(`/api/time-config?page=${page}&limit=${limit}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${search}`)
            .loginAs(user)
        console.log(res.body());
    })

    test('time-config store test', async ({ client }) => {
        const user = await User.findOrFail(1)
        const res = await client
            .post('/api/time-config')
            .form({
                type: 'shift-1',
                jam_mulai: '07:00:00',
                jam_berakhir: '15:00:00',
            })
            .loginAs(user)
        console.log(res.body());
    })

    test('time-config store validation test', async ({ client }) => {
        const user = await User.findOrFail(1)
        const res = await client
            .post('/api/time-config')
            .form({
                type: '',
                jam_mulai: '',
                jam_berakhir: '',
            })
            .loginAs(user)
        console.log(res.body());
    })

    test('time-config show test', async ({ client }) => {
        const user = await User.findOrFail(1)
        const res = await client
            .get('/api/time-config/1')
            .loginAs(user)
        console.log(res.body());
    })

    test('time-config edit test', async ({ client }) => {
        const user = await User.findOrFail(1)
        const res = await client
            .get('/api/time-config/1')
            .loginAs(user)
        console.log(res.body());
    })

    test('time-config update test', async ({ client }) => {
        const user = await User.findOrFail(1)
        const res = await client
            .patch('/api/time-config/1')
            .form({
                type: 'shift-1',
                jam_mulai: '07:00:00',
                jam_berakhir: '15:00:00',
            })
            .loginAs(user)
        console.log(res.body());
    })

    test('time-config update validation test', async ({ client }) => {
        const user = await User.findOrFail(1)
        const res = await client
            .patch('/api/time-config/1')
            .form({
                type: '',
                jam_mulai: '',
                jam_berakhir: '',
            })
            .loginAs(user)
        console.log(res.body());
    })

    test('time-config delete test', async ({ client }) => {
        const user = await User.findOrFail(1)
        const res = await client
            .delete('/api/time-config/2')
            .loginAs(user)
        console.log(res.body());
    })
})

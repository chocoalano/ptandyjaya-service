import BaseRepository from "../../BaseRepository";
import MasterGroup from "App/Models/Form/MasterGroup";
import UserGroup from "App/Models/MasterData/Users/UserGroup";
import Kasbon from "App/Models/Feature/Kasbon";
import User from "App/Models/MasterData/Users/User";

export default class KasbonOperations extends BaseRepository {
    constructor() {
        super(Kasbon);
    }
    async index(input: any) {
        const { sortBy, search, sortDesc, page, limit } = input
        const fetch = await Kasbon.query().where('user_id', 'LIKE', '%' + search + '%').orderBy([
            {
                column: sortBy !== '' ? sortBy : 'created_at',
                order: sortDesc ? 'desc' : 'asc',
            }
        ])
            .preload('user')
            .preload('angsuran')
            .paginate(page, limit)
        return { status: true, data: fetch, msg: 'success' }
    }

    async report(input: any) {
        const { sortBy, sortDesc, page, limit, search, daterange } = input
        const fetch = await Kasbon.query().orderBy([
            {
                column: sortBy === '' ? 'created_at' : sortBy,
                order: sortDesc ? 'desc' : 'asc',
            }
        ])
            .where('user_id', 'LIKE', '%' + search + '%')
            .whereBetween('created_at', daterange.split(","))
            .preload('user')
            .preload('angsuran')
            .paginate(page, limit)
        return { status: true, data: fetch, msg: 'success' }
    }

    async exportreport(input: any) {
        const { daterange } = input
        const fetch = await Kasbon.query().orderBy([
            {
                column: 'created_at',
                order: 'asc',
            }
        ])
            .whereBetween('created_at', daterange.split(","))
            .preload('user')
            .preload('angsuran')
        return { status: true, data: fetch, msg: 'success' }
    }

    async attribute(input: any) {
        switch (input['key']) {
            case 'group':
                const group = await MasterGroup.all()
                return { status: true, data: group, msg: 'success' }
            case 'user':
                const find = input['value']
                const cariuSER = await UserGroup.query().where('master_group_id', find).preload('user')
                return { status: true, data: cariuSER, msg: 'success' }
        }
    }

    async create(auth: any) {
        const userApproval = await User.query().where('dept_id', 1)
        return {
            status: true, data: {
                auth: auth.user,
                userApproval: userApproval,
            }, msg: 'success'
        }
    }

    async user(auth: any) {
        const user = await User.all()
        return {
            status: true, data: {
                auth: auth.user,
                user: user,
            }, msg: 'success'
        }
    }

    async stored(input: any) {
        const post: any[] = []
        for (let i = 0; i < input.tenor; i++) {
            post.push({
                status_pembayaran: 'n'
            })
        }
        const q = new Kasbon()
        q.merge(input)
        if (await q.save()) {
            await q.related('angsuran').createMany(post)
        }
        return { status: true, data: input, msg: 'success' }
    }
}
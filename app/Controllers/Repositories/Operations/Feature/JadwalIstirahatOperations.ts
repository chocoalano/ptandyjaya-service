import JadwalIstirahat from "App/Models/Feature/JadwalIstirahat";
import BaseRepository from "../../BaseRepository";
import MasterGroup from "App/Models/Form/MasterGroup";
import UserGroup from "App/Models/MasterData/Users/UserGroup";

export default class JadwalIstirahatOperations extends BaseRepository {
    constructor() {
        super(JadwalIstirahat);
    }
    async index(input: any) {
        const { sortBy, search, sortDesc, page, limit } = input
        const fetch = await JadwalIstirahat.query().where('dept_id', 'LIKE', '%' + search + '%').orderBy([
            {
                column: sortBy !== '' ? sortBy : 'created_at',
                order: sortDesc ? 'desc' : 'asc',
            }
        ])
            .preload('dept')
            .preload('role')
            .preload('user')
            .paginate(page, limit)
        return { status: true, data: fetch, msg: 'success' }
    }

    async report(input: any) {
        const { sortBy, sortDesc, page, limit, search, daterange } = input
        const fetch = await JadwalIstirahat.query().where('dept_id', 'LIKE', '%' + search + '%').orderBy([
            {
                column: sortBy !== '' ? sortBy : 'created_at',
                order: sortDesc ? 'desc' : 'asc',
            }
        ])
            .whereBetween('date', daterange.split(","))
            .preload('dept')
            .preload('role')
            .preload('user')
            .paginate(page, limit)
        return { status: true, data: fetch, msg: 'success' }
    }

    async exportreport(input: any) {
        const { daterange } = input
        const fetch = await JadwalIstirahat.query().orderBy([
            {
                column: 'created_at',
                order: 'asc',
            }
        ])
            .whereBetween('date', daterange.split(","))
            .preload('dept')
            .preload('role')
            .preload('user')
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
}
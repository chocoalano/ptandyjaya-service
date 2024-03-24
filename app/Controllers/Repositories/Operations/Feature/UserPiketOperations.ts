import UserPiket from "App/Models/MasterData/Users/UserPiket";
import BaseRepository from "../../BaseRepository";
import MasterGroup from "App/Models/Form/MasterGroup";
import MasterPiket from "App/Models/MasterData/MasterPiket";
import UserGroup from "App/Models/MasterData/Users/UserGroup";

export default class UserPiketOperations extends BaseRepository {
    constructor() {
        super(UserPiket);
    }
    async index(input: any) {
        const { sortBy, search, sortDesc, page, limit } = input
        const fetch = await UserPiket.query().where('dept_id', 'LIKE', '%' + search + '%').orderBy([
            {
                column: sortBy !== '' ? sortBy : 'created_at',
                order: sortDesc ? 'desc' : 'asc',
            }
        ])
            .preload('dept')
            .preload('role')
            .preload('user')
            .preload('masterPiket')
            .paginate(page, limit)
        return { status: true, data: fetch, msg: 'success' }
    }

    async report(input: any) {
        const { sortBy, sortDesc, page, limit, search, daterange } = input
        const fetch = await UserPiket.query().where('dept_id', 'LIKE', '%' + search + '%').orderBy([
            {
                column: sortBy !== '' ? sortBy : 'created_at',
                order: sortDesc ? 'desc' : 'asc',
            }
        ])
            .whereBetween('date', daterange.split(","))
            .preload('dept')
            .preload('role')
            .preload('user')
            .preload('masterPiket')
            .paginate(page, limit)
        return { status: true, data: fetch, msg: 'success' }
    }

    async exportExcel(input: any) {
        const { daterange } = input
        const fetch = await UserPiket.query().orderBy([
            {
                column: 'created_at',
                order: 'asc',
            }
        ])
            .whereBetween('date', daterange.split(","))
            .preload('dept')
            .preload('role')
            .preload('user')
            .preload('masterPiket')
        return { status: true, data: fetch, msg: 'success' }
    }

    async attribute(input: any) {
        switch (input['key']) {
            case 'group':
                const group = await MasterGroup.all()
                const piket = await MasterPiket.all()
                return { status: true, data: { group: group, piket: piket }, msg: 'success' }
            case 'user':
                const k = input['value']
                const cariuSER = await UserGroup.query().where('master_group_id', k).preload('user')
                return { status: true, data: cariuSER, msg: 'success' }
        }
    }
}
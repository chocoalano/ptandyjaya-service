import MasterGroup from "App/Models/Form/MasterGroup";
import BaseRepository from "../../BaseRepository";
import User from "App/Models/MasterData/Users/User";

export default class UserGroupOperations extends BaseRepository {
    constructor() {
        super(MasterGroup);
    }
    async index(input: any) {
        const { page, limit } = input
        const fetch = await MasterGroup.query().preload('membersTeams').paginate(page, limit)
        const user = await User.all()
        const allgroup = await MasterGroup.all()
        return { status: true, data: { datatable: fetch, user, allgroup }, msg: 'success' }
    }
    async stored(input: any) {
        const find = await MasterGroup.findOrFail(input.master_group_id)
        await find.related('members').sync(input.user_id)
        return { status: true, data: input, msg: 'success' }
    }
    async attribute() {
        const master_group = await MasterGroup.all()
        const user = await User.all()
        return {
            status: true, data: { master_group, user }, msg: 'success'
        }
    }
    async updated(input: any) {
        const arrname = [] as any;
        const fetch = input.user_id
        for (let i = 0; i < fetch.length; i++) {
            arrname.push(fetch[i])
        }
        await (await MasterGroup.findOrFail(input.master_group_id)).related('members').sync(arrname)
        return { status: true, data: input, msg: 'success' }
    }
}
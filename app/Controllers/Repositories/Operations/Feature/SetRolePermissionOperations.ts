import BaseRepository from "../../BaseRepository";
import Permission from 'App/Models/MasterData/Permission'
import Role from 'App/Models/MasterData/Role'
import RoleHasPermission from 'App/Models/Feature/RoleHasPermission'

export default class SetRolePermissionOperations extends BaseRepository {
    constructor() {
        super(RoleHasPermission);
    }

    async index(input: any) {
        const { page, limit, sortDesc } = input
        const fetch = await RoleHasPermission.query()
            .preload('roles')
            .preload('permission')
            .orderBy([
                {
                    column: 'id',
                    order: sortDesc ? 'desc' : 'asc',
                }
            ]).paginate(page, limit)
        return { status: true, data: fetch, msg: 'success' }
    }

    async attribute() {
        const jabatan = await Role.all()
        const akses = await Permission.all()
        return { status: true, data: { "role": jabatan, "akses": akses }, msg: 'success' }
    }

    async stored(input: any) {
        const arrname = [] as any;
        const fetch = input.permission_id
        for (let i = 0; i < fetch.length; i++) {
            arrname.push({
                role_id: input.role_id,
                permission_id: fetch[i]
            })
        }
        await RoleHasPermission.updateOrCreateMany(['role_id', 'permission_id'], arrname)
        return { status: true, data: input, msg: 'success' }
    }

    async updated(data: any): Promise<any> {
        const arrname = [] as any;
        const fetch = data.permission_id
        for (let i = 0; i < fetch.length; i++) {
            arrname.push(fetch[i])
        }
        await (await Role.findOrFail(data.role_id)).related('permission').sync(arrname)
        return { status: true, data: data, msg: 'success' }
    }
}
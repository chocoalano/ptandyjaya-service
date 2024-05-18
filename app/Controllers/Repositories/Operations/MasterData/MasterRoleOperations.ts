import Role from "App/Models/MasterData/Role";
import BaseRepository from "../../BaseRepository";
import RoleHasPermission from "App/Models/Feature/RoleHasPermission";

export default class MasterRoleOperations extends BaseRepository {
    constructor() {
        super(Role);
    }

    async deletedRole(id: number) {
        const p = await RoleHasPermission.findBy('role_id', id)
        if (p) {
            await p.delete()
            const r = await Role.find(id)
            if (r) {
                await r.delete()
                return r
            }
            return null
        }
        return null
    }
}
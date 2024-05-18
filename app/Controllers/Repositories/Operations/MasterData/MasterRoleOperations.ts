import Role from "App/Models/MasterData/Role";
import BaseRepository from "../../BaseRepository";
import Database from '@ioc:Adonis/Lucid/Database'

export default class MasterRoleOperations extends BaseRepository {
    constructor() {
        super(Role);
    }

    async deletedRole(id: number) {
        try {
            await Database.from('role_has_permissions').where('role_id', id).delete()
            const q = await Role.query().where('id', id).delete()
            return q
        } catch (error) {
            throw error
        }
    }
}
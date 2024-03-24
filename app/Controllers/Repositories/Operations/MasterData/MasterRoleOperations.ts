import Role from "App/Models/MasterData/Role";
import BaseRepository from "../../BaseRepository";

export default class MasterRoleOperations extends BaseRepository {
    constructor() {
        super(Role);
    }
}
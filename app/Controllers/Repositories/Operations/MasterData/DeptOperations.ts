import Dept from "App/Models/MasterData/Dept";
import BaseRepository from "../../BaseRepository";

export default class DeptOperations extends BaseRepository {
    constructor() {
        super(Dept);
    }
}
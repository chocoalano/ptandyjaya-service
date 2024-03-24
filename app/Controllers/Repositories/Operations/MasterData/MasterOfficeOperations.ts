import MasterOffice from "App/Models/MasterData/MasterOffice";
import BaseRepository from "../../BaseRepository";

export default class MasterOfficeOperations extends BaseRepository {
    constructor() {
        super(MasterOffice);
    }
}
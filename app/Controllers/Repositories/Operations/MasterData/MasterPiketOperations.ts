import MasterOffice from "App/Models/MasterData/MasterOffice";
import BaseRepository from "../../BaseRepository";

export default class MasterPiketOperations extends BaseRepository {
    constructor() {
        super(MasterOffice);
    }
}
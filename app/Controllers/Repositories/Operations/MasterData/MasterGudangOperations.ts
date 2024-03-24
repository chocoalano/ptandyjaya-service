import MasterGudang from "App/Models/MasterData/MasterGudang";
import BaseRepository from "../../BaseRepository";

export default class MasterGudangOperations extends BaseRepository {
    constructor() {
        super(MasterGudang);
    }
}
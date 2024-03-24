import MasterToko from "App/Models/MasterData/MasterToko";
import BaseRepository from "../../BaseRepository";

export default class MasterTokoOperations extends BaseRepository {
    constructor() {
        super(MasterToko);
    }
}
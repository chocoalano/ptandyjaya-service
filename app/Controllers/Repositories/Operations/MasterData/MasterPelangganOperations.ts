import MasterPelanggan from "App/Models/MasterData/MasterPelanggan";
import BaseRepository from "../../BaseRepository";

export default class MasterPelangganOperations extends BaseRepository {
    constructor() {
        super(MasterPelanggan);
    }
}
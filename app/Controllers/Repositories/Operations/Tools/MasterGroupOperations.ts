import MasterGroup from "App/Models/Form/MasterGroup";
import BaseRepository from "../../BaseRepository";

export default class MasterGroupOperations extends BaseRepository {
    constructor() {
        super(MasterGroup);
    }
}
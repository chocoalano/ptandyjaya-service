import TimeConfig from "App/Models/Form/TimeConfig";
import BaseRepository from "../../BaseRepository";

export default class TimeConfigOperations extends BaseRepository {
    constructor() {
        super(TimeConfig);
    }
}
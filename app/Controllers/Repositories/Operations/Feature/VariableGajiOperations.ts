import BaseRepository from "../../BaseRepository";
import FormulaGaji from "App/Models/Feature/FormulaGaji";

export default class VariableGajiOperations extends BaseRepository {
    constructor() {
        super(FormulaGaji);
    }
}
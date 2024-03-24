import BaseRepository from "../../BaseRepository";
import Resign from "App/Models/Feature/Resign";

export default class ResignOperations extends BaseRepository {
    constructor() {
        super(Resign);
    }
    async index(input: any) {
        const { sortBy, search, sortDesc, page, limit } = input
        const fetch = await Resign.query().where('user_id', 'LIKE', '%' + search + '%').orderBy([
            {
                column: sortBy !== '' ? sortBy : 'created_at',
                order: sortDesc ? 'desc' : 'asc',
            }
        ])
            .preload('user')
            .paginate(page, limit)
        return { status: true, data: fetch, msg: 'success' }
    }
}
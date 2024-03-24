import BaseRepository from "../../BaseRepository";
import FormPerdin from "App/Models/Form/FormPerdin";

export default class PerdinsOperations extends BaseRepository {
    constructor() {
        super(FormPerdin);
    }
    async index(input: any) {
        const { sortBy, search, sortDesc, page, limit } = input
        const fetch = await FormPerdin.query().where('user_id', 'LIKE', '%' + search + '%').orderBy([
            {
                column: sortBy !== '' ? sortBy : 'user_id',
                order: sortDesc ? 'desc' : 'asc',
            }
        ])
            .preload('user')
            .preload('userapproval')
            .paginate(page, limit)
        return { status: true, data: fetch, msg: 'success' }
    }
    async report(input: any) {
        const { sortBy, sortDesc, page, limit, search, daterange } = input
        const fetch = await FormPerdin.query().orderBy([
            {
                column: sortBy === '' ? 'created_at' : sortBy,
                order: sortDesc ? 'desc' : 'asc',
            }
        ])
            .where('user_id', 'LIKE', '%' + search + '%')
            .whereBetween('created_at', daterange.split(","))
            .preload('user')
            .preload('userapproval')
            .paginate(page, limit)
        return { status: true, data: fetch, msg: 'success' }
    }
    async reportExport(input: any) {
        const { daterange } = input
        const fetch = await FormPerdin.query().orderBy([
            {
                column: 'created_at',
                order: 'asc',
            }
        ])
            .whereBetween('created_at', daterange.split(","))
            .preload('user')
            .preload('userapproval')
        return { status: true, data: fetch, msg: 'success' }
    }
}
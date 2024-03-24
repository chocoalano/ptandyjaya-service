import BaseRepository from "../../BaseRepository";
import FormLembur from "App/Models/Form/FormLembur";

export default class LemburOperations extends BaseRepository {
    constructor() {
        super(FormLembur);
    }
    async index(input: any) {
        const { sortBy, search, sortDesc, page, limit } = input
        const fetch = await FormLembur.query()
        .where('user_id', 'LIKE', '%' + search + '%')
        .orderBy([
            {
                column: sortBy !== '' ? sortBy : 'id',
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
        const fetch = await FormLembur.query().orderBy([
            {
                column: sortBy === '' ? 'created_at' : sortBy,
                order: sortDesc ? 'desc' : 'asc',
            }
        ])
            .where('user_id', 'LIKE', '%' + search + '%')
            .whereBetween('date', daterange.split(","))
            .preload('user')
            .preload('userapproval')
            .paginate(page, limit)
        return { status: true, data: fetch, msg: 'success' }
    }
    async exportreport(input: any) {
        const { daterange } = input
        const fetch = await FormLembur.query().orderBy([
            {
                column: 'created_at',
                order: 'asc',
            }
        ])
            .whereBetween('date', daterange.split(","))
            .preload('user')
            .preload('userapproval')
        return { status: true, data: fetch, msg: 'success' }
    }
}
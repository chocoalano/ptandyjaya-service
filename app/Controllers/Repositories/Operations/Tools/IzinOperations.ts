import FormIzin from "App/Models/Form/FormIzin";
import BaseRepository from "../../BaseRepository";

export default class IzinOperations extends BaseRepository {
    constructor() {
        super(FormIzin);
    }
    async index(input:any){
        const { sortBy, sortDesc, page, limit, search } = input
        const fetch = await FormIzin.query().orderBy([
            {
                column: sortBy === '' ? 'created_at' : sortBy,
                order: sortDesc ? 'desc' : 'asc',
            }
        ])
        .where('user_id', 'LIKE', '%' + search + '%')
        .preload('user')
        .preload('userapproval')
        .paginate(page, limit)
        return { status: true, data: fetch, msg: 'success' }
    }

    async report(input:any){
        const { sortBy, sortDesc, page, limit, search, daterange } = input
        const fetch = await FormIzin.query().orderBy([
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

    async exportreport(input:any){
        const { daterange } = input
        const fetch = await FormIzin.query().orderBy([
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
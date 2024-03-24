import BaseRepository from "../../BaseRepository";
import FormCuti from "App/Models/Form/FormCuti";

export default class CutiOperations extends BaseRepository {
    constructor() {
        super(FormCuti);
    }
    async index(input:any){
        const { sortBy, sortDesc, page, limit, search } = input
        const fetch = await FormCuti.query().orderBy([
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
        const fetch = await FormCuti.query().orderBy([
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
        const fetch = await FormCuti.query().orderBy([
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
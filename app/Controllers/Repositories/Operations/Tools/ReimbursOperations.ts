import FormReimbur from "App/Models/Form/FormReimbur";
import BaseRepository from "../../BaseRepository";
import { UnlinkFile, UploadFile, uniqueDatime } from "App/helper";

export default class ReimbursOperations extends BaseRepository {
    constructor() {
        super(FormReimbur);
    }
    async index(input: any) {
        const { sortBy, search, sortDesc, page, limit } = input
        const fetch = await FormReimbur.query().where('user_id', 'LIKE', '%' + search + '%').orderBy([
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
        const fetch = await FormReimbur.query().orderBy([
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
        const fetch = await FormReimbur.query().orderBy([
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

    async storeReimburs(input:any, auth:any){
        const q = new FormReimbur()
        let unique = auth.user?.nik + '-' + auth.user?.name + '-' + uniqueDatime(new Date())
        if (input.file_receipt != null) {
            UploadFile(input.file_receipt, `reimburs-${unique}`, `uploads/reimburs`)
            q.file_receipt = `reimburs-${unique}.${input.file_receipt.extname}`
        }
        q.user_id = input.user_id
        q.transaction_id = unique
        q.date = input.date
        q.category = input.category
        q.user_id_approval = input.user_id_approval
        q.status_approval = input.status_approval
        await q.save()
        return { status: true, data: q, msg: 'success' }
    }
    async updateReimburs(id:number, input:any, auth:any){
        const q = await FormReimbur.findOrFail(id)
        let unique = auth.user?.nik + '-' + auth.user?.name + '-' + uniqueDatime(new Date())
        if (input.file_receipt != null) {
            UnlinkFile(q.file_receipt, `uploads/reimburs`)
            UploadFile(input.file_receipt, `reimburs-${unique}`, `uploads/reimburs`)
            q.file_receipt = `reimburs-${unique}.${input.file_receipt.extname}`
        }
        q.user_id = input.user_id
        q.transaction_id = unique
        q.date = input.date
        q.category = input.category
        q.user_id_approval = input.user_id_approval
        q.status_approval = input.status_approval
        await q.save()
        return { status: true, data: q, msg: 'success' }
    }
}
import BaseRepository from "../../BaseRepository";
import { schema } from '@ioc:Adonis/Core/Validator'
import Database from "@ioc:Adonis/Lucid/Database";
import Gaji from "App/Models/Feature/Gaji";
import { gaji_variable } from "App/helper";

export default class GajiOperations extends BaseRepository {
    constructor() {
        super(Gaji);
    }

    async index(input: any) {
        const { sortBy, search, sortDesc, page, limit } = input
        const fetch = await Gaji.query().where('user_id', 'LIKE', '%' + search + '%').orderBy([
            {
                column: sortBy !== '' ? sortBy : 'created_at',
                order: sortDesc ? 'desc' : 'asc',
            }
        ])
            .preload('user')
            .preload('gajivariable')
            .paginate(page, limit)
        return { status: true, data: fetch, msg: 'success' }
    }

    async stored(input: any) {
        const postSchema = schema.create({
            post: schema.array().members(
                schema.object().members({
                    user_id: schema.number(),
                    total_absen: schema.number(),
                    total_terlambat: schema.number(),
                    total_workday: schema.number(),
                    periode: schema.string(),
                    gaji_perbulan: schema.number(),
                    gaji_perhari: schema.number(),
                    gaji_thp: schema.number(),
                })
            ),
        })
        const payload = await input.validate({ schema: postSchema })

        payload.post.forEach(async el => {
            const variable = await Database
                .from('formula_gajis as fg')
                .join('variable_gajis as vg', 'fg.variable_name', '=', 'vg.variable_name')
                .select('fg.variable_name')
                .select('fg.operator')
                .select('vg.bobot')
                .select('vg.id')
            const arr: any[] = []
            variable.forEach(e => {
                const x = gaji_variable(e.variable_name, e.bobot, el.gaji_perhari, el.periode, el.total_absen)
                arr.push({
                    variable_gaji_id: e.id,
                    bobot: e.bobot,
                    nominal: x
                })
            });
            const cekdata = await Database
                .from('gajis')
                .where('periode', el.periode)
                .andWhere('user_id', el.user_id)
                .count('* as total')
                
            if (cekdata[0].total === 0) {
                const q = new Gaji()
                q.user_id = el.user_id
                q.total_absen = el.total_absen
                q.total_terlambat = el.total_terlambat
                q.total_workday = el.total_workday
                q.periode = el.periode
                q.gaji_perbulan = el.gaji_perbulan
                q.gaji_perhari = el.gaji_perhari
                q.gaji_thp = el.gaji_thp
                await q.save()
                await q.related('gajivariable').createMany(arr)
            }
        });
        return { status: true, data: payload.post, msg: 'success' }
    }

    async show(id: number) {
        const q = await Gaji.query().where('id', id).preload('user');
        return { status: true, data: q, msg: 'success' }
    }

    async updated(id: number | string, input: any) {
        const postSchema = schema.create({
            user_id: schema.number(),
            total_absen: schema.number(),
            total_terlambat: schema.number(),
            total_workday: schema.number(),
            periode: schema.string(),
            gaji_perbulan: schema.number(),
            gaji_perhari: schema.number(),
            gaji_thp: schema.number(),
        })
        const payload = await input.validate({ schema: postSchema })
        const q = await Gaji.findOrFail(id);
        const variable = await Database
            .from('formula_gajis as fg')
            .join('variable_gajis as vg', 'fg.variable_name', '=', 'vg.variable_name')
            .select('fg.variable_name')
            .select('fg.operator')
            .select('vg.bobot')
            .select('vg.id')
        const arr: any[] = []
        variable.forEach(e => {
            const x = gaji_variable(e.variable_name, e.bobot, q.gaji_perhari, q.periode, q.total_absen)
            arr.push({
                variable_gaji_id: e.id,
                bobot: e.bobot,
                nominal: x
            })
        });
        q.user_id = payload.user_id
        q.total_absen = payload.total_absen
        q.total_terlambat = payload.total_terlambat
        q.total_workday = payload.total_workday
        q.periode = payload.periode
        q.gaji_perbulan = payload.gaji_perbulan
        q.gaji_perhari = payload.gaji_perhari
        q.gaji_thp = payload.gaji_thp
        await q.save()
        await q.related('gajivariable').updateOrCreateMany(arr, 'gaji_id')
        return { status: true, data: q, msg: 'success' }
    }

    async deleted(id: number) {
        const q = await Gaji.findOrFail(id)
        await Database
            .from('gaji_variables')
            .where('gaji_id', q.id)
            .delete()
        await q.delete()
        return { status: true, data: q, msg: 'success' }
    }

    async report(input: any) {
        const { sortBy, sortDesc, page, limit, search, daterange } = input
        const fetch = await Gaji.query().orderBy([
            {
                column: sortBy === '' ? 'created_at' : sortBy,
                order: sortDesc ? 'desc' : 'asc',
            }
        ])
            .where('user_id', 'LIKE', '%' + search + '%')
            .whereBetween('created_at', daterange.split(","))
            .preload('user')
            .preload('gajivariable')
            .paginate(page, limit)
        return { status: true, data: fetch, msg: 'success' }
    }

    async exportreport(input: any) {
        const { daterange } = input
        const fetch = await Gaji.query().orderBy([
            {
                column: 'created_at',
                order: 'asc',
            }
        ])
            .whereBetween('created_at', daterange.split(","))
            .preload('user')
            .preload('gajivariable')
        return { status: true, data: fetch, msg: 'success' }
    }

    async slip(userId: number) {
        if (userId !== undefined || userId !== 'undefined') {
            const q = await Gaji.query()
                .where((query) => {
                    query
                        .where('user_id', userId)
                        .where('periode', '2024-03')
                })
                .preload('user');
            const x = await Database.rawQuery(`SELECT mo.* FROM users u JOIN user_offices uo ON u.id = uo.user_id JOIN master_offices mo ON uo.master_office_id = mo.id WHERE u.id = ${userId}`);
            return { status: true, data: { data: q, office: x[0][0] }, msg: 'success' }
        }
        return { status: false, data: userId, msg: 'errors' }
    }
}
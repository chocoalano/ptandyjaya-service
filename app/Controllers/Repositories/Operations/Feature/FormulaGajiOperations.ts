import Database from "@ioc:Adonis/Lucid/Database";
import BaseRepository from "../../BaseRepository";
import FormulaGaji from "App/Models/Feature/FormulaGaji";
import * as _ from 'lodash';
import Kasbon from "App/Models/Feature/Kasbon";

export default class FormulaGajiOperations extends BaseRepository {
    constructor() {
        super(FormulaGaji);
    }
    async generate(input: any) {
        const formatter = new Intl.DateTimeFormat('en-US', { month: '2-digit' });
        let curmonth = formatter.format(new Date())


        var d = new Date([input.tahun, input.bulan].join('-')),
            month = '' + (d.getMonth() + 1),
            year = d.getFullYear();
        if (month.length < 2)
            month = '0' + month;
        const absensi = await Database.rawQuery(`select distinct a.*, u.name, u.nik, u.total_gaji_perbulan from absensis as a join users as u on a.user_id = u.id where YEAR(a.jam_pulang)=${year} AND MONTH(a.jam_pulang)=${month}`)

        const fetchdata: any[] = []
        for (let i = 0; i < absensi[0].length; i++) {
            const e = absensi[0][i];
            const count = await Database.rawQuery(`select count(a.id) as total from absensis as a join users as u on a.user_id = u.id where YEAR(a.jam_pulang)=${year} AND MONTH(a.jam_pulang)=${month} AND a.user_id = ${e.user_id}`)
            const telat = await Database.rawQuery(`select count(a.id) as total from absensis as a join users as u on a.user_id = u.id where YEAR(a.jam_pulang)=${year} AND MONTH(a.jam_pulang)=${month} AND a.user_id = ${e.user_id} AND a.status_masuk = 'telat'`)
            const kasbon = await Kasbon.query().whereRaw(`YEAR(created_at) = ${new Date().getFullYear()}`).andWhereRaw(`MONTH(created_at) = ${curmonth}`).andWhere('user_id', e.user_id).andWhere('status_approval', 'y').sum('nominal_pinjaman as sum_total')

            fetchdata.push({
                id: e.id,
                user_id: e.user_id,
                name: e.name,
                nik: e.nik,
                total_gaji_perbulan: parseFloat(e.total_gaji_perbulan),
                total_absen: count[0][0].total,
                total_absen_telat: telat[0][0].total,
                total_kasbon: kasbon[0].$extras.sum_total === null ? 0 : parseFloat(kasbon[0].$extras.sum_total),
                periode_gaji: [year, month].join('-'),
            })
        }
        const uniqueArray = _.uniqBy(fetchdata, 'name');
        return { status: true, data: uniqueArray, msg: 'success' }
    }
}
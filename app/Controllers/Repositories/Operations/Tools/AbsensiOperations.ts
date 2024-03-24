import Absensi from "App/Models/Absensi";
import BaseRepository from "../../BaseRepository";
import { DateTimeFormated, UploadFile, arrayUnique } from "App/helper";
import Database from "@ioc:Adonis/Lucid/Database";

export default class AbsensiOperations extends BaseRepository {
    constructor() {
        super(Absensi);
    }
    async absenMasuk(input:any, auth:any) {
        const datenow = new Date((new Date()).getTime() + 24 * 60 * 60 * 1000)
            const cekDate = DateTimeFormated('YYYY-MM-DD', datenow)
            const count = await Database
                .from('absensis')
                .count('* as total')
                .where((query) => {
                    query
                        .whereRaw('DATE(jam_masuk) = ?', [cekDate])
                        .where('user_id', auth.user?.id!)
                })
            if (count[0].total < 1) {
                const cekUser = await Database.from('user_tokos').where('user_id', auth.user?.id!)
                const toko = cekUser[0] !== undefined ? cekUser[0].master_toko_id : null
                const namafile = DateTimeFormated('yyyymmddhhiiss', new Date())
                UploadFile(input.foto_selfi, namafile, 'uploads/absensi-users')
                const q = new Absensi()
                q.user_id = auth.user?.id!
                q.toko_id = toko
                q.jam_masuk = new Date((new Date()).getTime() + 24 * 60 * 60 * 1000)
                q.latitude_masuk = input.latitude
                q.longitude_masuk = input.longitude
                q.status_masuk = input.status
                q.waktu_telat_masuk = input.waktu_telat_masuk!
                q.foto_selfi_masuk = namafile + '.jpg' as string
                await q.save()
                return { status: true, data: input, msg: 'success' }
            }
        return { status: true, data: input, msg: 'success' }
    }

    async absenPulang(input:any, auth:any){
        const datenow = new Date((new Date()).getTime() + 24 * 60 * 60 * 1000)
        const cekDate = DateTimeFormated('YYYY-MM-DD', datenow)
        const count = await Database
            .from('absensis')
            .count('* as total')
            .where((query) => {
                query
                    .whereRaw('DATE(jam_pulang) = ?', [cekDate])
                    .where('user_id', auth.user?.id!)
            })
        if (count[0].total < 1) {
            const namafile = DateTimeFormated('yyyymmddhhiiss', new Date())
            UploadFile(input.foto_selfi, namafile, 'uploads/absensi-users')
            await Absensi
                .query()
                .where((query) => {
                    query
                        .where('user_id', auth.user?.id!)
                        .whereNull('jam_pulang')
                })
                .orderBy('id', 'desc')
                .update({
                    jam_pulang: new Date((new Date()).getTime() + 24 * 60 * 60 * 1000),
                    latitude_pulang: input.latitude,
                    longitude_pulang: input.longitude,
                    foto_selfi_pulang: namafile + '.jpg' as string,
                })
            return { status: true, data: input, msg: 'success' }
        }
        return { status: true, data: input, msg: 'success' }
    }

    async chart(auth:any){
        const absensitelat = await Database.rawQuery(`SELECT COUNT(*) as count, MONTH(jam_masuk) as month_name FROM absensis where YEAR(jam_masuk) = date('Y') AND status_masuk = 'telat' AND user_id = ${auth.user?.id!} GROUP BY month_name`)
        const absensinormal = await Database.rawQuery(`SELECT COUNT(*) as count, MONTH(jam_masuk) as month_name FROM absensis where YEAR(jam_masuk) = date('Y') AND status_masuk = 'tidak telat' AND user_id = ${auth.user?.id!} GROUP BY month_name`)
        const month1: string[] = [];
        const month2: string[] = [];
        const telat: number[] = [];
        const tidak_telat: number[] = [];
        absensitelat[0].forEach((e: { month_name: string; }) => {
            month1.push(e.month_name)
        });
        absensinormal[0].forEach((e: { month_name: string; }) => {
            month2.push(e.month_name)
        });
        var Q = arrayUnique(month1.concat(month2));
        const label = Q.sort(function (a: number, b: number) {
            return a - b;
        })
        label.forEach(bulan => {
            let obj = absensitelat[0].find(o => o.month_name === bulan);
            if (obj !== undefined) {
                telat.push(obj.count)
            } else {
                telat.push(0)
            }
        });
        label.forEach(bulan => {
            let obj = absensinormal[0].find(o => o.month_name === bulan);
            if (obj !== undefined) {
                tidak_telat.push(obj.count)
            } else {
                tidak_telat.push(0)
            }
        });
        return { status: true, data: { label, telat, tidak_telat }, msg: 'success' }
    }

    async laporan(input:any){
        const { sortBy, sortDesc, page, limit, between, search } = input
        const fetch = await Absensi.query()
            .orderBy([
                {
                    column: sortBy !== '' ? sortBy : 'created_at',
                    order: sortDesc ? 'desc' : 'asc',
                }
            ])
            .where('toko_id', search > 0 ? search : null)
            .whereBetween('jam_pulang', between.split(","))
            .preload('users')
            .preload('toko')
            .paginate(page, limit)
        return { status: true, data: fetch, msg: 'success' }
    }
}
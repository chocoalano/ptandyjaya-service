import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AbsensiOperations from 'App/Controllers/Repositories/Operations/Tools/AbsensiOperations'
import AbsensiValidator from 'App/Validators/AbsensiValidator'


export default class AbsensiController {
    private operation: any;
    constructor() {
        this.operation = new AbsensiOperations();
    }
    public async index({ bouncer, response, request }: HttpContextContract) {
        try {
            await bouncer.with('AbsensiPolicy').authorize('viewList')
            const input = request.all()
            const fetch = await this.operation.pagination(input)
            return response.send({ status: true, data: fetch, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async store({ bouncer, request, response, auth }: HttpContextContract) {
        try {
            await bouncer.with('AbsensiPolicy').authorize('create')
            const payload = await request.validate(AbsensiValidator)
            if (payload.keterangan_absen === 'masuk') {
                const save = await this.operation.absenMasuk(payload, auth)
                return response.send(save)
            }
            if (payload.keterangan_absen === 'pulang') {
                const save = await this.operation.absenPulang(payload, auth)
                return response.send(save)
            }
            return response.send({ status: false, msg: 'error' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async show({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('AbsensiPolicy').authorize('view')
            const q = await this.operation.find(request.param('id'));
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async destroy({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('AbsensiPolicy').authorize('delete')
            const q = await this.operation.delete(request.param('id'))
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async chart({ bouncer, response, auth }: HttpContextContract) {
        try {
            await bouncer.with('AbsensiPolicy').authorize('viewList')
            const q = await this.operation.chart(auth)
            return response.send(q)
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async laporan({ bouncer, response, request }: HttpContextContract) {
        try {
            await bouncer.with('AbsensiPolicy').authorize('viewList')
            const input = request.all()
            const t = input['between'].split(',')
            if (t.length > 1) {
                const q = await this.operation.laporan(request.all())
                return response.send(q)
            }
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }
}

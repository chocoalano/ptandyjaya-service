import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import JadwalIstirahatOperations from 'App/Controllers/Repositories/Operations/Feature/JadwalIstirahatOperations'
import Ws from 'App/Services/Ws'
import JadwalIstirahatValidator from 'App/Validators/JadwalIstirahatValidator'

export default class JadwalIstirahatsController {
    private operation: any;
    constructor() {
        this.operation = new JadwalIstirahatOperations();
    }
    public async index({ bouncer, response, request }: HttpContextContract) {
        try {
            await bouncer.with('JadwalIstirahatPolicy').authorize('viewList')
            const q = await this.operation.index(request.all())
            return response.send(q)
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }
    public async report({ bouncer, response, request }: HttpContextContract) {
        try {
            await bouncer.with('JadwalIstirahatPolicy').authorize('viewList')
            const q = await this.operation.report(request.all())
            return response.send(q)
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }
    public async exportreport({ bouncer, response, request }: HttpContextContract) {
        try {
            await bouncer.with('JadwalIstirahatPolicy').authorize('viewList')
            const q = await this.operation.exportreport(request.all())
            return response.send(q)
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }
    public async attr_form({ request, bouncer, response }: HttpContextContract) {
        try {
            await bouncer.with('JadwalIstirahatPolicy').authorize('viewList')
            const q = await this.operation.attribute(request.all())
            return response.send(q)
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }
    public async store({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('JadwalIstirahatPolicy').authorize('create')
            const payload = await request.validate(JadwalIstirahatValidator)
            const q = await this.operation.store(payload)
            Ws.io.emit('jadwal-istirahat:new', { payload })
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }
}

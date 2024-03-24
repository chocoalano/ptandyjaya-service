import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PerdinsOperations from 'App/Controllers/Repositories/Operations/Tools/PerdinsOperations';
import FormPerdin from 'App/Models/Form/FormPerdin'
import Ws from 'App/Services/Ws'
import PerdinValidator from 'App/Validators/PerdinValidator'

export default class PerdinsController {
    private operation: any;
    constructor() {
        this.operation = new PerdinsOperations();
    }
    public async index({ bouncer, response, request }: HttpContextContract) {
        try {
            await bouncer.with('PerdinPolicy').authorize('viewList')
            const fetch = await this.operation.index(request.all())
            return response.send(fetch)
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async report({ bouncer, response, request }: HttpContextContract) {
        try {
            await bouncer.with('PerdinPolicy').authorize('viewList')
            const q = await this.operation.report(request.all())
            return response.send(q)
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async exportreport({ bouncer, response, request }: HttpContextContract) {
        try {
            await bouncer.with('PerdinPolicy').authorize('viewList')
            const q = await this.operation.reportExport(request.all())
            return response.send(q)
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async store({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('PerdinPolicy').authorize('create')
            const payload = await request.validate(PerdinValidator)
            await this.operation.store(payload)
            Ws.io.emit('notif-info:pengajuan-perdin', { payload })
            return response.send({ status: true, data: payload, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async show({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('PerdinPolicy').authorize('view')
            const q = await this.operation.find(request.param('id'));
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async update({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('PerdinPolicy').authorize('update')
            const payload = await request.validate(PerdinValidator)
            const q = await this.operation.update(request.param('id'), payload)
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async destroy({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('PerdinPolicy').authorize('delete')
            const q = await this.operation.delete(request.param('id'))
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async approval({ bouncer, request, response, auth }: HttpContextContract) {
        try {
            await bouncer.with('PerdinPolicy').authorize('viewList')
            const q = await FormPerdin.findOrFail(request.param('id'))
            if (auth.user?.id === q.user_id_approval) {
                q.status_approval = 'y'
                await q.save()
                Ws.io.emit('notif-info:approval-perdin', { q })
                return response.send({ status: true, data: {}, msg: 'success' })
            }
            return response.send({ status: false, data: { msg: 'approval not valid!' }, msg: 'error' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }
}

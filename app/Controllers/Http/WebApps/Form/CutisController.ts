import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CutiOperations from 'App/Controllers/Repositories/Operations/Tools/CutiOperations';

import FormCuti from "App/Models/Form/FormCuti"
import Ws from 'App/Services/Ws'
import CutiValidator from 'App/Validators/CutiValidator'

export default class CutisController {
    private operation: any;
    constructor() {
        this.operation = new CutiOperations();
    }
    public async index({ bouncer, response, request }: HttpContextContract) {
        try {
            await bouncer.with('CutiPolicy').authorize('viewList')
            const q = await this.operation.index(request.all())
            return response.send(q)
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async report({ bouncer, response, request }: HttpContextContract) {
        try {
            await bouncer.with('CutiPolicy').authorize('viewList')
            const q = await this.operation.report(request.all())
            return response.send(q)
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async exportreport({ bouncer, response, request }: HttpContextContract) {
        try {
            await bouncer.with('CutiPolicy').authorize('viewList')
            const q = await this.operation.exportreport(request.all())
            return response.send(q)
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async store({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('CutiPolicy').authorize('create')
            const payload = await request.validate(CutiValidator)
            await this.operation.store(payload)
            Ws.io.emit('notif-info:pengajuan-cuti', { payload })
            return response.send({ status: true, data: payload, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async show({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('CutiPolicy').authorize('view')
            const q = await this.operation.find(request.param('id'));
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async update({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('CutiPolicy').authorize('update')
            const payload = await request.validate(CutiValidator)
            const q = await this.operation.update(request.param('id'), payload);
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async destroy({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('CutiPolicy').authorize('delete')
            const q = await this.operation.delete(request.param('id'))
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async approval({ bouncer, request, response, auth }: HttpContextContract) {
        try {
            await bouncer.with('CutiPolicy').authorize('viewList')
            const q = await FormCuti.findOrFail(request.param('id'))
            if (auth.user?.id === q.user_id_approval) {
                q.status_approval = request.input('status_approval')
                await q.save()
                Ws.io.emit('notif-info:approval-cuti', { q })
                return response.send({ status: true, data: {}, msg: 'success' })
            }
            return response.send({ status: false, data: { msg: 'approval not valid!' }, msg: 'error' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }
}

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ReimbursOperations from 'App/Controllers/Repositories/Operations/Tools/ReimbursOperations'
import FormReimbur from 'App/Models/Form/FormReimbur'
import Ws from 'App/Services/Ws'
import { ReimbursUpdateValidator, ReimbursValidator } from 'App/Validators/ReimbursValidator'
import { UnlinkFile } from 'App/helper'

export default class ReimbursController {
    private operation: any;
    constructor() {
        this.operation = new ReimbursOperations();
    }
    public async index({ bouncer, response, request }: HttpContextContract) {
        try {
            await bouncer.with('ReimbursPolicy').authorize('viewList')
            const q = await this.operation.index(request.all())
            return response.send(q)
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async report({ bouncer, response, request }: HttpContextContract) {
        try {
            await bouncer.with('ReimbursPolicy').authorize('viewList')
            const q = await this.operation.report(request.all())
            return response.send(q)
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async exportreport({ bouncer, response, request }: HttpContextContract) {
        try {
            await bouncer.with('ReimbursPolicy').authorize('viewList')
            const q = await this.operation.exportreport(request.all())
            return response.send(q)
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async store({ bouncer, request, response, auth }: HttpContextContract) {
        try {
            await bouncer.with('ReimbursPolicy').authorize('create')
            const payload = await request.validate(ReimbursValidator)
            const q = this.operation.storeReimburs(payload, auth)
            Ws.io.emit('notif-info:pengajuan-reimburs', { payload })
            return response.send(q)
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async show({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('ReimbursPolicy').authorize('view')
            const q = await this.operation.find(request.param('id'));
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async update({ bouncer, request, response, auth }: HttpContextContract) {
        try {
            await bouncer.with('ReimbursPolicy').authorize('update')
            const payload = await request.validate(ReimbursUpdateValidator)
            const q = this.operation.updateReimburs(request.param('id'), payload, auth)
            return response.send(q)
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async destroy({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('ReimbursPolicy').authorize('delete')
            const q = await this.operation.delete(request.param('id'))
            UnlinkFile(q.file_receipt, `uploads/reimburs`)
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async approval({ bouncer, request, response, auth }: HttpContextContract) {
        try {
            await bouncer.with('ReimbursPolicy').authorize('viewList')
            const q = await FormReimbur.findOrFail(request.param('id'))
            if (auth.user?.id === q.user_id_approval) {
                q.status_approval = 'y'
                await q.save()
                Ws.io.emit('notif-info:approval-reimburs', { q })
                return response.send({ status: true, data: {}, msg: 'success' })
            }
            return response.send({ status: false, data: { msg: 'approval not valid!' }, msg: 'error' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }
}

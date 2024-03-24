import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LemburOperations from 'App/Controllers/Repositories/Operations/Tools/LemburOperations';
import FormLembur from 'App/Models/Form/FormLembur'
import Ws from 'App/Services/Ws'
import LemburValidator from 'App/Validators/LemburValidator'

export default class LembursController {
    private operation: any;
    constructor() {
        this.operation = new LemburOperations();
    }
    public async index({ bouncer, response, request }: HttpContextContract) {
        try {
            await bouncer.with('LemburPolicy').authorize('viewList')
            const q = await this.operation.index(request.all())
            return response.send(q)
        } catch (error) {
            console.log(error);
            
            return response.status(error.status).send(error)
        }
    }

    public async report({ bouncer, response, request }: HttpContextContract) {
        try {
            await bouncer.with('LemburPolicy').authorize('viewList')
            const q = this.operation.report(request.all())
            return response.send(q)
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async exportreport({ bouncer, response, request }: HttpContextContract) {
        try {
            await bouncer.with('LemburPolicy').authorize('viewList')
            const q = this.operation.exportreport(request.all())
            return response.send(q)
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async store({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('LemburPolicy').authorize('create')
            const payload = await request.validate(LemburValidator)
            await this.operation.store(payload)
            Ws.io.emit('notif-info:pengajuan-lembur', { payload })
            return response.send({ status: true, data: payload, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async show({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('LemburPolicy').authorize('view')
            const q = await this.operation.find(request.param('id'));
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async update({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('LemburPolicy').authorize('update')
            const payload = await request.validate(LemburValidator)
            const q = await this.operation.update(request.param('id'), payload)
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async destroy({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('LemburPolicy').authorize('delete')
            const q = await this.operation.delete(request.param('id'))
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async approval({ bouncer, request, response, auth }: HttpContextContract) {
        try {
            await bouncer.with('LemburPolicy').authorize('viewList')
            const q = await FormLembur.findOrFail(request.param('id'))
            if (auth.user?.id === q.user_id_approval) {
                q.status_approval = 'y'
                await q.save()
                Ws.io.emit('notif-info:approval-lembur', { q })
                return response.send({ status: true, data: {}, msg: 'success' })
            }
            return response.send({ status: false, data: { msg: 'approval not valid!' }, msg: 'error' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }
}

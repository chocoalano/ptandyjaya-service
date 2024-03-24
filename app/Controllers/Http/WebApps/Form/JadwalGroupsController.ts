import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import JadwalGroupOperations from 'App/Controllers/Repositories/Operations/Tools/JadwalGroupOperations'
import JadwalGroupValidator from 'App/Validators/JadwalGroupValidator'

export default class JadwalGroupsController {
    private operation: any;
    constructor() {
        this.operation = new JadwalGroupOperations();
    }
    public async index({ bouncer, response, request }: HttpContextContract) {
        try {
            await bouncer.with('JadwalGroupPolicy').authorize('viewList')
            const q = await this.operation.index(request.all())
            return response.send(q)
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async attr_form({ request, bouncer, response }: HttpContextContract) {
        try {
            await bouncer.with('JadwalGroupPolicy').authorize('viewList')
            const q = await this.operation.form_attr(request.input('key'))
            return response.send(q)
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async store({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('JadwalGroupPolicy').authorize('create')
            const payload = await request.validate(JadwalGroupValidator)
            const q = this.operation.storeMany(payload)
            return response.send(q)
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async show({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('JadwalGroupPolicy').authorize('view')
            const q = await this.operation.find(request.param('id'));
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async update({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('JadwalGroupPolicy').authorize('update')
            const payload = await request.validate(JadwalGroupValidator)
            const q = await this.operation.update(request.param('id'), payload)
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async destroy({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('JadwalGroupPolicy').authorize('delete')
            const q = await this.operation.delete(request.param('id'))
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }
}

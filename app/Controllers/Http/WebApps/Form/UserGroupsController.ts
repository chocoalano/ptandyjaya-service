import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserGroupOperations from 'App/Controllers/Repositories/Operations/Tools/UserGroupOperations'
import UserGroupValidator from 'App/Validators/UserGroupValidator'

export default class UserGroupsController {
    private operation: any;
    constructor() {
        this.operation = new UserGroupOperations();
    }
    public async index({ bouncer, response, request }: HttpContextContract) {
        try {
            await bouncer.with('TimeConfigPolicy').authorize('viewList')
            const q = await this.operation.index(request.all())
            return response.send(q)
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async store({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('TimeConfigPolicy').authorize('create')
            const payload = await request.validate(UserGroupValidator)
            const q = await this.operation.stored(payload)
            return response.send(q)
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async attr_form({ bouncer, response }: HttpContextContract) {
        try {
            await bouncer.with('TimeConfigPolicy').authorize('viewList')
            const q = await this.operation.attribute()
            return response.send(q)
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async show({ bouncer, response, request }: HttpContextContract) {
        try {
            await bouncer.with('TimeConfigPolicy').authorize('view')
            const fetch = await this.operation.findby('master_group_id', request.param('id'))
            return response.send({ status: true, data: fetch, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async update({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('TimeConfigPolicy').authorize('delete')
            const payload = await request.validate(UserGroupValidator)
            const q = await this.operation.updated(payload)
            return response.send(q)
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }
}

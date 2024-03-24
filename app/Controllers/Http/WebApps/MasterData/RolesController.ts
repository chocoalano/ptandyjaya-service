import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MasterRoleOperations from 'App/Controllers/Repositories/Operations/MasterData/MasterRoleOperations';
import RoleValidator from 'App/Validators/RoleValidator'

export default class RolesController {
    private operation: any;
    constructor() {
        this.operation = new MasterRoleOperations();
    }
    public async index({ bouncer, response, request }: HttpContextContract) {
        try {
            await bouncer.with('RolePolicy').authorize('viewList')
            const q = await this.operation.paginationWithFilter(request.all(), 'rolename', 'created_at')
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async store({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('RolePolicy').authorize('create')
            const payload = await request.validate(RoleValidator)
            const q = await this.operation.store(payload)
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async show({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('RolePolicy').authorize('view')
            const fetch = await this.operation.find(request.param('id'));
            return response.send({ status: true, data: fetch, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async update({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('RolePolicy').authorize('update')
            const payload = await request.validate(RoleValidator)
            const q = await this.operation.update(request.param('id'), payload)
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async destroy({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('RolePolicy').authorize('delete')
            const q = await this.operation.delete(request.param('id'))
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }
}

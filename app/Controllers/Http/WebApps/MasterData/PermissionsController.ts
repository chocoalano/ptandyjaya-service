import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MasterPermissionOperations from 'App/Controllers/Repositories/Operations/MasterData/MasterPermissionOperations';
import PermissionValidator from "App/Validators/PermissionValidator"

export default class PermissionsController {
    private operation: any;
    constructor() {
        this.operation = new MasterPermissionOperations();
    }
    public async index({ bouncer, response, request }: HttpContextContract) {
        try {
            await bouncer.with('PermissionPolicy').authorize('viewList')
            const q = await this.operation.paginationWithFilter(request.all(), 'name', 'created_at')
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async store({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('PermissionPolicy').authorize('create')
            if (request.input('permission')) {
                const payload = await request.validate(PermissionValidator)
                const q = await this.operation.stored(payload)
                return response.send(q)
            }
            return response.status(422).send('permission is required')
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async show({ bouncer, response, request }: HttpContextContract) {
        try {
            await bouncer.with('PermissionPolicy').authorize('view')
            const fetch = await this.operation.find(request.param('id'))
            return response.send({ status: true, data: fetch, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async update({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('PermissionPolicy').authorize('update')
            const payload = await request.validate(PermissionValidator)
            payload['name'] = request.input('permission') + '-' + payload['name']
            payload['basepermission'] = payload['name']
            const q = await this.operation.update(request.param('id'), payload)
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async destroy({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('PermissionPolicy').authorize('delete')
            const q = await this.operation.delete(request.param('id'))
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }
}

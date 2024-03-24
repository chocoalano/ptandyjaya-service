import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import SetRolePermissionOperations from 'App/Controllers/Repositories/Operations/Feature/SetRolePermissionOperations'
import RoleHasPermission from 'App/Models/Feature/RoleHasPermission';

export default class SetRolePermissionsController {
    private operation: any;
    constructor() {
        this.operation = new SetRolePermissionOperations();
    }
    public async index({ bouncer, response, request }: HttpContextContract) {
        try {
            await bouncer.with('PermissionPolicy').authorize('viewList')
            const q = await this.operation.index(request.all())
            return response.send(q)
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async store({ bouncer, request, response }: HttpContextContract) {
        try {
            const newPostSchema = schema.create({
                role_id: schema.number(),
                permission_id: schema.array().members(schema.number()),
            })
            await bouncer.with('PermissionPolicy').authorize('create')
            const payload = await request.validate({ schema: newPostSchema })
            const q = await this.operation.stored(payload)
            return response.send(q)
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async attr_form({ bouncer, response }: HttpContextContract) {
        try {
            await bouncer.with('PermissionPolicy').authorize('viewList')
            const q = await this.operation.attribute()
            return response.send(q)
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async show({ bouncer, response, request }: HttpContextContract) {
        try {
            await bouncer.with('PermissionPolicy').authorize('view')
            const id = request.param('id')
            const fetch = await RoleHasPermission.query().where('role_id', id)
            return response.send({ status: true, data: fetch, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async update({ bouncer, request, response }: HttpContextContract) {
        try {
            const newPostSchema = schema.create({
                role_id: schema.number(),
                permission_id: schema
                    .array([
                        rules.minLength(1)
                    ])
                    .members(schema.number()),
            })
            const payload = await request.validate({ schema: newPostSchema })
            await bouncer.with('PermissionPolicy').authorize('update')
            const q = await this.operation.updated(payload)
            return response.send(q)
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

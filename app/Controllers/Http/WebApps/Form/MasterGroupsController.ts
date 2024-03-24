import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MasterGroupOperations from 'App/Controllers/Repositories/Operations/Tools/MasterGroupOperations'
import MasterGroup from 'App/Models/Form/MasterGroup'
import User from 'App/Models/MasterData/Users/User'
import UserGroup from 'App/Models/MasterData/Users/UserGroup'
import MasterGroupValidator from 'App/Validators/MasterGroupValidator'

export default class MasterGroupsController {
    private operation: any;
    constructor() {
        this.operation = new MasterGroupOperations();
    }
    public async index({ bouncer, response, request }: HttpContextContract) {
        try {
            await bouncer.with('MasterGroupPolicy').authorize('viewList')
            const fetch = await this.operation.paginationWithFilter(request.all(), 'user_id', 'id')
            return response.send({ status: true, data: fetch, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async store({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('MasterGroupPolicy').authorize('create')
            const payload = await request.validate(MasterGroupValidator)
            const q = await this.operation.store(payload)
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async show({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('MasterGroupPolicy').authorize('view')
            const q = await MasterGroup.findOrFail(request.param('id'));
            const findUser = await User.findOrFail(q.user_id_kepgroup)
            const fetchUser = await User.query().where('dept_id', findUser.dept_id)
            const userGroup = await UserGroup.query().where('master_group_id', request.param('id'))
            return response.send({ status: true, data: { mastergroup: q, fetchUser, userGroup }, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async update({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('MasterGroupPolicy').authorize('update')
            const payload = await request.validate(MasterGroupValidator)
            const q = await this.operation.update(request.param('id'), payload)
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async destroy({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('MasterGroupPolicy').authorize('delete')
            const q = await this.operation.delete(request.param('id'))
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }
}

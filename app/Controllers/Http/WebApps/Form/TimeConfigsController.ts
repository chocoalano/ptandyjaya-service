import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import JadwalGroup from 'App/Models/Form/JadwalGroup'
import UserGroup from 'App/Models/MasterData/Users/UserGroup'
import TimeConfigValidator from 'App/Validators/TimeConfigValidator'
import TimeConfigOperations from 'App/Controllers/Repositories/Operations/Tools/TimeConfigOperations'

export default class TimeConfigsController {
    private operation: any;
    constructor() {
        this.operation = new TimeConfigOperations();
    }
    public async index({ bouncer, response, request }: HttpContextContract) {
        try {
            await bouncer.with('TimeConfigPolicy').authorize('viewList')
            const q = await this.operation.paginationWithFilter(request.all(), 'type', 'created_at')
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async store({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('TimeConfigPolicy').authorize('create')
            const payload = await request.validate(TimeConfigValidator)
            const q = await this.operation.store(payload)
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async show({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('TimeConfigPolicy').authorize('view')
            const q = await this.operation.find(request.param('id'));
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async update({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('TimeConfigPolicy').authorize('update')
            const payload = await request.validate(TimeConfigValidator)
            const q = await this.operation.update(request.param('id'), payload)
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async destroy({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('TimeConfigPolicy').authorize('delete')
            const q = await this.operation.find(request.param('id'))
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }
    public async jadwal_user({ response, auth }: HttpContextContract) {
        try {
            const findUser = await UserGroup.findByOrFail('user_id', auth.user?.id!)
            if (findUser) {
                const jadwal = await JadwalGroup.query()
                    .where('master_group_id', findUser.master_group_id)
                    .preload('time_config')
                    .preload('master_group')
                return response.send({ status: true, data: jadwal, msg: 'success' })
            }
            return response.status(404).send({ status: false, data: null, msg: 'data not found' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }
}

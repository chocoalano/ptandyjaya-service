import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserPiketOperations from 'App/Controllers/Repositories/Operations/Feature/UserPiketOperations'
import UserPiket from 'App/Models/MasterData/Users/UserPiket'
import Ws from 'App/Services/Ws'
import UserPiketValidator from 'App/Validators/UserPiketValidator'

export default class UserPiketsController {
    private operation: any;
    constructor() {
        this.operation = new UserPiketOperations();
    }
    public async index({ bouncer, response, request }: HttpContextContract) {
        try {
            await bouncer.with('JadwalPiketPolicy').authorize('viewList')
            const q = await this.operation.index(request.all())
            return response.send(q)
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }
    public async report({ bouncer, response, request }: HttpContextContract) {
        try {
            await bouncer.with('JadwalPiketPolicy').authorize('viewList')
            const q = await this.operation.report(request.all())
            return response.send(q)
        } catch (error) {
            return response.send({ status: false, data: error.messages, msg: 'error' })
        }
    }
    public async exportreport({ bouncer, response, request }: HttpContextContract) {
        try {
            await bouncer.with('JadwalPiketPolicy').authorize('viewList')
            const q = await this.operation.exportExcel(request.all())
            return response.send(q)
        } catch (error) {
            return response.send({ status: false, data: error.messages, msg: 'error' })
        }
    }
    public async attr_form({ request, bouncer, response }: HttpContextContract) {
        try {
            await bouncer.with('JadwalPiketPolicy').authorize('viewList')
            const q = await this.operation.attribute(request.all())
            return response.send(q)
        } catch (error) {
            return response.send({ status: false, data: error.messages, msg: 'error' })
        }
    }
    public async store({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('JadwalPiketPolicy').authorize('create')
            const payload = await request.validate(UserPiketValidator)
            const q = await this.operation.store(payload)
            Ws.io.emit('jadwal-piket:new', { payload })
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.send({ status: false, data: error.messages, msg: 'error' })
        }
    }
    public async show({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('JadwalPiketPolicy').authorize('view')
            const fetch = await UserPiket.query()
                .where('id', request.param('id'))
                .preload('masterPiket')
                .preload('user')
                .preload('role')
                .preload('dept')
            return response.send({ status: true, data: fetch, msg: 'success' })
        } catch (error) {
            return response.send({ status: false, data: error.messages, msg: 'error' })
        }
    }
    public async destroy({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('JadwalPiketPolicy').authorize('delete')
            const x = await this.operation.delete(request.param('id'))
            return response.send({ status: true, data: x, msg: 'success' })
        } catch (error) {
            return response.send({ status: false, data: error.messages, msg: 'error' })
        }
    }
}
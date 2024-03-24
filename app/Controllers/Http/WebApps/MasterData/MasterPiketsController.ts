import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MasterPiketOperations from 'App/Controllers/Repositories/Operations/MasterData/MasterPiketOperations'
import MasterPiketValidator from 'App/Validators/MasterPiketValidator'

export default class MasterPiketsController {
    private operation: any;
    constructor() {
        this.operation = new MasterPiketOperations();
    }
    public async index({ bouncer, response, request }: HttpContextContract) {
        try {
            await bouncer.with('JadwalPiketPolicy').authorize('viewList')
            const q = await this.operation.paginationWithFilter(request.all(), 'tugas', 'created_at')
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async store({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('JadwalPiketPolicy').authorize('create')
            const payload = await request.validate(MasterPiketValidator)
            const q = await this.operation.store(payload)
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async show({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('JadwalPiketPolicy').authorize('view')
            const q = await this.operation.find(request.param('id'));
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async update({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('JadwalPiketPolicy').authorize('update')
            const payload = await request.validate(MasterPiketValidator)
            const q = await this.operation.update(request.param('id'), payload)
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async destroy({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('JadwalPiketPolicy').authorize('delete')
            const q = await this.operation.delete(request.param('id'))
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }
}

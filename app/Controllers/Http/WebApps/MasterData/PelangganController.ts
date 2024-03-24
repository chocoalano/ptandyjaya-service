import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MasterPelangganOperations from 'App/Controllers/Repositories/Operations/MasterData/MasterPelangganOperations';
import PelangganValidator from 'App/Validators/PelangganValidator'

export default class PelangganController {
    private operation: any;
    constructor() {
        this.operation = new MasterPelangganOperations();
    }
    public async index({ bouncer, response, request }: HttpContextContract) {
        try {
            await bouncer.with('PelangganPolicy').authorize('viewList')
            const q = await this.operation.paginationWithFilter(request.all(), 'nama', 'created_at')
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async store({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('PelangganPolicy').authorize('create')
            const validate = await request.validate(PelangganValidator)
            const q = await this.operation.store(validate)
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async show({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('PelangganPolicy').authorize('view')
            const fetch = await this.operation.find(request.param('id'));
            return response.send({ status: true, data: fetch, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async update({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('PelangganPolicy').authorize('update')
            const payload = await request.validate(PelangganValidator)
            const q = await this.operation.update(request.param('id'), payload)
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async destroy({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('PelangganPolicy').authorize('delete')
            const q = await this.operation.delete(request.param('id'))
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }
}
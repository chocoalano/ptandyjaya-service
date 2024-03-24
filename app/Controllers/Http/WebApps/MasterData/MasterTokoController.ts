import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MasterTokoOperations from 'App/Controllers/Repositories/Operations/MasterData/MasterTokoOperations';
import MasterTokoValidator from 'App/Validators/MasterTokoValidator'

export default class MasterTokoController {
    private operation: any;
    constructor() {
        this.operation = new MasterTokoOperations();
    }
    public async index({ bouncer, response, request }: HttpContextContract) {
        try {
            await bouncer.with('MasterTokoPolicy').authorize('viewList')
            const q = await this.operation.paginationWithFilter(request.all(), 'nama', 'created_at')
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async store({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('MasterTokoPolicy').authorize('create')
            const payload = await request.validate(MasterTokoValidator)
            const q = this.operation.store(payload)
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async show({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('MasterTokoPolicy').authorize('view')
            const q = await this.operation.find(request.param('id'));
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async update({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('MasterTokoPolicy').authorize('update')
            const payload = await request.validate(MasterTokoValidator)
            const q = await this.operation.update(request.param('id'), payload)
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async destroy({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('MasterTokoPolicy').authorize('delete')
            const q = await this.operation.delete(request.param('id'))
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }
}

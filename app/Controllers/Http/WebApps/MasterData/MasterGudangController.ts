import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MasterGudangOperations from 'App/Controllers/Repositories/Operations/MasterData/MasterGudangOperations';
import MasterGudangValidator from 'App/Validators/MasterGudangValidator'

export default class MasterGudangController {
    private operation: any;
    constructor() {
        this.operation = new MasterGudangOperations();
    }
    public async index({ bouncer, response, request }: HttpContextContract) {
        try {
            await bouncer.with('MasterGudangPolicy').authorize('viewList')
            const q = await this.operation.paginationWithFilter(request.all(), 'nama', 'created_at')
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async store({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('MasterGudangPolicy').authorize('create')
            const payload = await request.validate(MasterGudangValidator)
            const q = this.operation.store(payload)
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async show({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('MasterGudangPolicy').authorize('view')
            const q = await this.operation.find(request.param('id'));
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async update({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('MasterGudangPolicy').authorize('update')
            const payload = await request.validate(MasterGudangValidator)
            const q = await this.operation.update(request.param('id'), payload)
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async destroy({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('MasterGudangPolicy').authorize('delete')
            const q = await this.operation.delete(request.param('id'))
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }
}

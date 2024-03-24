import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MasterOfficeOperations from 'App/Controllers/Repositories/Operations/MasterData/MasterOfficeOperations';
import MasterOfficeValidator from 'App/Validators/MasterOfficeValidator'

export default class MasterOfficeController {
    private operation: any;
    constructor() {
        this.operation = new MasterOfficeOperations();
    }
    public async index({ bouncer, response, request }: HttpContextContract) {
        try {
            await bouncer.with('MasterOfficePolicy').authorize('viewList')
            const q = await this.operation.paginationWithFilter(request.all(), 'nama', 'created_at')
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async store({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('MasterOfficePolicy').authorize('create')
            const payload = await request.validate(MasterOfficeValidator)
            const q = await this.operation.store(payload)
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async show({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('MasterOfficePolicy').authorize('view')
            const q = await this.operation.find(request.param('id'));
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async update({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('MasterOfficePolicy').authorize('update')
            const payload = await request.validate(MasterOfficeValidator)
            const q = await this.operation.update(request.param('id'), payload)
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async destroy({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('MasterOfficePolicy').authorize('delete')
            const q = await this.operation.delete(request.param('id'))
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }
}

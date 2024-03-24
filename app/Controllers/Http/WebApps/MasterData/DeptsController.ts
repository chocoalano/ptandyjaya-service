import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DeptOperations from 'App/Controllers/Repositories/Operations/MasterData/DeptOperations';
import DeptValidator from 'App/Validators/DeptValidator'

export default class DeptsController {
    private operation: any;
    constructor() {
        this.operation = new DeptOperations();
    }
    public async index({ bouncer, response, request }: HttpContextContract) {
        try {
            await bouncer.with('DeptPolicy').authorize('viewList')
            const q = await this.operation.paginationWithFilter(request.all(), 'deptname', 'created_at')
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async store({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('DeptPolicy').authorize('create')
            const payload = await request.validate(DeptValidator)
            const q = await this.operation.store(payload)
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async show({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('DeptPolicy').authorize('view')
            const q = await this.operation.find(request.param('id'));
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async update({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('DeptPolicy').authorize('update')
            const payload = await request.validate(DeptValidator)
            const q = await this.operation.update(request.param('id'), payload)
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async destroy({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('DeptPolicy').authorize('delete')
            const q = await this.operation.delete(request.param('id'))
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }
}

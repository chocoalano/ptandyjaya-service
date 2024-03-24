import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import GajiOperations from 'App/Controllers/Repositories/Operations/Feature/GajiOperations'

export default class GajisController {
    private operation: any;
    constructor() {
        this.operation = new GajiOperations();
    }
    public async index({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('GajiPolicy').authorize('viewList')
            const q = await this.operation.index(request.all())
            return response.send(q)
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async store({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('GajiPolicy').authorize('create')
            const q = await this.operation.stored(request)
            return response.send(q)
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async show({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('GajiPolicy').authorize('view')
            const q = await this.operation.show(request.param('id'));
            return response.send(q)
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async update({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('GajiPolicy').authorize('update')
            const q = await this.operation.updated(request.param('id'), request)
            return response.send(q)
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async destroy({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('GajiPolicy').authorize('delete')
            const q = this.operation.deleted(request.param('id'))
            return response.send(q)
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async report({ bouncer, response, request }: HttpContextContract) {
        try {
            await bouncer.with('GajiPolicy').authorize('viewList')
            const q = await this.operation.report(request.all())
            return response.send(q)
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async exportreport({ bouncer, response, request }: HttpContextContract) {
        try {
            await bouncer.with('GajiPolicy').authorize('viewList')
            const q = await this.operation.exportreport(request.all())
            return response.send(q)
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }
    public async selip({ bouncer, response, request }: HttpContextContract) {
        try {
            await bouncer.with('GajiPolicy').authorize('viewList')
            const userId = request.param('userId')
            const q = await this.operation.slip(userId)
            return response.send(q)
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }
}

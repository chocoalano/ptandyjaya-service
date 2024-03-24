import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import VariableGajiOperations from 'App/Controllers/Repositories/Operations/Feature/VariableGajiOperations';

export default class VariableGajisController {
    private operation: any;
    constructor() {
        this.operation = new VariableGajiOperations();
    }
    public async index({ response }: HttpContextContract) {
        try {
            const fetch = await this.operation.all()
            return response.send({ status: true, data: fetch, msg: 'success' })
        } catch (error) {
            return response.send({ status: false, data: error.messages, msg: 'error' })
        }
    }

    public async store({ request, response }: HttpContextContract) {
        try {
            const input = request.all()
            const q = await this.operation.store(input)
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.send({ status: false, data: error.messages, msg: 'error' })
        }
    }

    public async show({ request, response }: HttpContextContract) {
        try {
            const q = await this.operation.find(request.param('id'));
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.send({ status: false, data: error.messages, msg: 'error' })
        }
    }

    public async update({ request, response }: HttpContextContract) {
        try {
            const input = request.all()
            const q = await this.operation.update(request.param('id'), input)
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.send({ status: false, data: error.messages, msg: 'error' })
        }
    }

    public async destroy({ request, response }: HttpContextContract) {
        try {
            const q = await this.operation.delete(request.param('id'))
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.send({ status: false, data: error.messages, msg: 'error' })
        }
    }
}

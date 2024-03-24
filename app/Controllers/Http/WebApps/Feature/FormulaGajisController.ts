import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import FormulaGajiOperations from 'App/Controllers/Repositories/Operations/Feature/FormulaGajiOperations';

export default class FormulaGajisController {
    private operation: any;
    constructor() {
        this.operation = new FormulaGajiOperations();
    }
    public async index({ response }: HttpContextContract) {
        try {
            const fetch = await this.operation.GetOrder('id', 'asc')
            return response.send({ status: true, data: fetch, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async store({ request, response }: HttpContextContract) {
        try {
            const postSchema = schema.create({
                post: schema.array().members(
                    schema.object().members({
                        variable_name: schema.string(),
                        operator: schema.string(),
                    })
                ),
            })
            const payload = await request.validate({ schema: postSchema })
            const q = await this.operation.updateOrCreateMany('variable_name', payload.post)
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async show({ request, response }: HttpContextContract) {
        try {
            const q = await this.operation.find(request.param('id'));
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async update({ request, response }: HttpContextContract) {
        try {
            const q = await this.operation.update(request.param('id'), request.all())
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async destroy({ request, response }: HttpContextContract) {
        try {
            const q = await this.operation.delete(request.param('id'))
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async generate({ request, response }: HttpContextContract) {
        try {
            const input = request.all()
            const q = await this.operation.generate(input)
            return response.send(q)
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }
}

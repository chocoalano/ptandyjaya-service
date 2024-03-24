import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import ResignOperations from 'App/Controllers/Repositories/Operations/Feature/ResignOperations';
import Resign from 'App/Models/Feature/Resign'

export default class ResignsController {
  private operation: any;
  constructor() {
    this.operation = new ResignOperations();
  }
  public async index({ bouncer, request, response }: HttpContextContract) {
    try {
      await bouncer.with('ResignPolicy').authorize('viewList')
      const q = await this.operation.index(request.all())
      return response.send(q)
    } catch (error) {
      return response.status(error.status).send(error)
    }
  }

  public async store({ bouncer, request, response }: HttpContextContract) {
    try {
      await bouncer.with('ResignPolicy').authorize('create')
      const postSchema = schema.create({
        user_id: schema.number(),
        alasan: schema.string(),
        masukan: schema.string(),
        status_persetujuan: schema.string(),
      })
      const payload = await request.validate({ schema: postSchema })
      const q = await this.operation.store(payload)
      return response.send({ status: true, data: q, msg: 'success' })
    } catch (error) {
      return response.status(error.status).send(error)
    }
  }

  public async show({ bouncer, request, response }: HttpContextContract) {
    try {
      await bouncer.with('ResignPolicy').authorize('view')
      const q = await Resign.query().where('id', request.param('id')).preload('user');
      return response.send({ status: true, data: q, msg: 'success' })
    } catch (error) {
      return response.status(error.status).send(error)
    }
  }

  public async update({ bouncer, request, response }: HttpContextContract) {
    try {
      await bouncer.with('ResignPolicy').authorize('update')
      const postSchema = schema.create({
        user_id: schema.number(),
        alasan: schema.string(),
        masukan: schema.string(),
        status_persetujuan: schema.string(),
      })
      const payload = await request.validate({ schema: postSchema })
      const q = await this.operation.update(request.param('id'), payload)
      return response.send({ status: true, data: q, msg: 'success' })
    } catch (error) {
      return response.status(error.status).send(error)
    }
  }

  public async destroy({ bouncer, request, response }: HttpContextContract) {
    try {
      await bouncer.with('ResignPolicy').authorize('delete')
      const q = await this.operation.delete(request.param('id'))
      return response.send({ status: true, data: q, msg: 'success' })
    } catch (error) {
      return response.status(error.status).send(error)
    }
  }
}

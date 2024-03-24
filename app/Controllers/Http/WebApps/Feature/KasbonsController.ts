import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import KasbonOperations from 'App/Controllers/Repositories/Operations/Feature/KasbonOperations'
import KasbonValidator from 'App/Validators/KasbonValidator'

export default class KasbonsController {
  private operation: any;
  constructor() {
    this.operation = new KasbonOperations();
  }
  public async index({ bouncer, response, request }: HttpContextContract) {
    try {
      await bouncer.with('KasbonPolicy').authorize('viewList')
      const q = await this.operation.index(request.all())
      return response.send(q)
    } catch (error) {
      return response.status(error.status).send(error)
    }
  }

  public async report({ bouncer, response, request }: HttpContextContract) {
    try {
      await bouncer.with('KasbonPolicy').authorize('viewList')
      const q = await this.operation.report(request.all())
      return response.send(q)
    } catch (error) {
      return response.status(error.status).send(error)
    }
  }

  public async exportreport({ bouncer, response, request }: HttpContextContract) {
    try {
      await bouncer.with('KasbonPolicy').authorize('viewList')
      const q = await this.operation.exportreport(request.all())
      return response.send(q)
    } catch (error) {
      return response.status(error.status).send(error)
    }
  }

  public async create({ bouncer, auth, response }: HttpContextContract) {
    try {
      await bouncer.with('KasbonPolicy').authorize('viewList')
      const q = await this.operation.create(auth)
      return response.send(q)
    } catch (error) {
      return response.status(error.status).send(error)
    }
  }

  public async user({ bouncer, auth, response }: HttpContextContract) {
    try {
      await bouncer.with('KasbonPolicy').authorize('viewList')
      const q = await this.operation.user(auth)
      return response.send(q)
    } catch (error) {
      return response.status(error.status).send(error)
    }
  }

  public async store({ bouncer, request, response }: HttpContextContract) {
    try {
      await bouncer.with('KasbonPolicy').authorize('create')
      const payload = await request.validate(KasbonValidator)
      const q = await this.operation.stored(payload)
      return response.send(q)
    } catch (error) {
      return response.status(error.status).send(error)
    }
  }

  public async show({ bouncer, request, response }: HttpContextContract) {
    try {
      await bouncer.with('KasbonPolicy').authorize('view')
      const q = await this.operation.find(request.param('id'));
      return response.send({ status: true, data: q, msg: 'success' })
    } catch (error) {
      return response.status(error.status).send(error)
    }
  }

  public async update({ bouncer, request, response }: HttpContextContract) {
    try {
      await bouncer.with('KasbonPolicy').authorize('update')
      const payload = await request.validate(KasbonValidator)
      const q = await this.operation.update(request.param('id'), payload)
      return response.send({ status: true, data: q, msg: 'success' })
    } catch (error) {
      return response.status(error.status).send(error)
    }
  }

  public async destroy({ bouncer, request, response }: HttpContextContract) {
    try {
      await bouncer.with('KasbonPolicy').authorize('delete')
      const q = await this.operation.delete(request.param('id'))
      return response.send({ status: true, data: q, msg: 'success' })
    } catch (error) {
      return response.status(error.status).send(error)
    }
  }
}

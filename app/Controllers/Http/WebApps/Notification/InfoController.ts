import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

export default class InfoController {
  public async index({ auth, response }: HttpContextContract) {
    try {
      const q = await Database
        .from('view_count_notif_info')
        .where('user_id', auth.user?.id!)
        .orderBy('created_at', 'desc')
      const r = await Database
        .from('view_count_notif_info')
        .where('user_id', auth.user?.id!)
        .andWhere('approval', 'n')
        .count('* as total')
      return response.send({ status: true, data: { data: q, count: r[0].total }, msg: 'success' })
    } catch (error) {
      return response.send({ status: false, data: error.messages, msg: 'error' })
    }
  }

  public async store({ }: HttpContextContract) { }

  public async show({ }: HttpContextContract) { }

  public async update({ }: HttpContextContract) { }

  public async destroy({ }: HttpContextContract) { }
}

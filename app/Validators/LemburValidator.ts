import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Messages from './Mesages'

export default class LemburValidator extends Messages {
  constructor(protected ctx: HttpContextContract) {
    super()
  }

  public schema = schema.create({
    user_id: schema.number(),
    date: schema.date({ format: 'sql' }),
    waktu_mulai: schema.string(),
    waktu_berakhir: schema.string(),
    uraian_tugas: schema.string(),
    user_id_approval: schema.number(),
    status_approval: schema.enum(['y', 'n']),
  })
}

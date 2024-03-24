import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Messages from './Mesages'

export default class PerdinValidator extends Messages {
  constructor(protected ctx: HttpContextContract) {
    super()
  }

  public schema = schema.create({
    user_id: schema.number(),
    tempat_tujuan: schema.string(),
    tgl_brangkat: schema.date({ format: 'sql' }),
    tgl_kembali: schema.date({ format: 'sql' }),
    tujuan_perdin: schema.string(),
    user_id_approval: schema.number(),
    status_approval: schema.string(),
  })
}

import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Messages from './Mesages'

export default class KasbonValidator extends Messages{
  constructor(protected ctx: HttpContextContract) {
    super()
  }

  public schema = schema.create({
    user_id: schema.number(),
    nominal_pinjaman: schema.number(),
    nominal_angsuran: schema.number(),
    tenor: schema.number(),
    status_pinjaman: schema.enum(['lunas', 'belum-lunas']),
    user_id_approval: schema.number(),
    status_approval: schema.enum(['y', 'n', 'w']),
  })
}

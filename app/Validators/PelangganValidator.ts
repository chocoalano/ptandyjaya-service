import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Messages from './Mesages'

export default class PelangganValidator extends Messages{
  constructor(protected ctx: HttpContextContract) {
    super()
  }

  public schema = schema.create({
    nama: schema.string(),
    email: schema.string(),
    telp: schema.number(),
    alamat: schema.string(),
  })
}

import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Messages from './Mesages'

export default class MasterOfficeValidator extends Messages{
  constructor(protected ctx: HttpContextContract) {
    super()
  }

  public schema = schema.create({
    nama: schema.string(),
    alamat: schema.string(),
    latitude: schema.string(),
    longitude: schema.string(),
    radius_forabsen: schema.string(),
    telepon: schema.string([
      rules.minLength(12),
      rules.maxLength(13),
    ]),
  })
}

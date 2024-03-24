import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Messages from './Mesages'

export default class MasterTokoValidator extends Messages{
  constructor(protected ctx: HttpContextContract) {
    super()
  }

  public schema = schema.create({
    latitude: schema.number(),
    longitude: schema.number(),
    status: schema.enum(['telat', 'tidak telat']),
    keterangan_absen: schema.enum(['masuk', 'pulang']),
    waktu_telat_masuk: schema.string.optional(),
    foto_selfi: schema.file({
      size: '5mb',
      extnames: ['jpg', 'png'],
    }),
  })
}

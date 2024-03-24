import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Messages from './Mesages'

export default class TimeConfigValidator extends Messages {
  constructor(protected ctx: HttpContextContract) {
    super()
  }

  public schema = schema.create({
    type: schema.enum(['shift-1', 'shift-2', 'shift-3', 'nonshift']),
    jam_mulai: schema.string(),
    jam_berakhir: schema.string(),
  })
}

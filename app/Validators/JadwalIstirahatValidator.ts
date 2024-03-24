import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Messages from './Mesages'

export default class JadwalIstirahatValidator extends Messages{
  constructor(protected ctx: HttpContextContract) {
    super()
  }

  public schema = schema.create({
    dept_id: schema.number(),
    role_id: schema.number(),
    user_id: schema.number(),
    time: schema.string(),
    date: schema.date({ format: 'sql' }),
  })
}

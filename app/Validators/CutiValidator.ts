import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Messages from './Mesages'

export default class CutiValidator extends Messages {
  constructor(protected ctx: HttpContextContract) {
    super()
  }

  public schema = schema.create({
    user_id: schema.number(),
    remaining: schema.number(),
    leave_req: schema.string(),
    req_type: schema.enum(['once', 'range'] as const),
    date: schema.date({ format: 'sql' }),
    todate: schema.date({ format: 'sql' }),
    leave_duration: schema.number(),
    notes: schema.string(),
    user_id_approval: schema.number(),
    status_approval: schema.enum(['y', 'n']),
  })
}

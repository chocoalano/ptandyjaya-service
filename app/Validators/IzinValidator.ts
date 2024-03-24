import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Messages from './Mesages'

export default class IzinValidator extends Messages {
  constructor(protected ctx: HttpContextContract) {
    super()
  }
  public schema = schema.create({
    user_id: schema.number(),
    permit_req: schema.enum(['come to late', 'sick', 'not present', 'other']),
    req_type: schema.enum(['once', 'range']),
    date: schema.date({ format: 'sql' }),
    todate: schema.date({ format: 'sql' }),
    leave_duration: schema.number(),
    notes: schema.string(),
    user_id_approval: schema.number(),
    status_approval: schema.enum(['y', 'n']),
  })
}

export class FileValidator extends Messages {
  constructor(protected ctx: HttpContextContract) {
    super()
  }
  public schema = schema.create({
    file: schema.file({
      size: '10mb',
      extnames: ['jpg', 'png','JPG', 'PNG'],
    }),
  })
}

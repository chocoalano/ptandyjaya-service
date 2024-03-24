import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Messages from './Mesages'

export default class UserPiketValidator extends Messages{
  constructor(protected ctx: HttpContextContract) {
    super()
  }

  public schema = schema.create({
    master_piket_id: schema.number(),
    dept_id: schema.number(),
    role_id: schema.number(),
    user_id: schema.number(),
    time: schema.string(),
    date: schema.date({ format: 'sql' }),
    status: schema.enum(['y', 'n']),
  })
}

export class FileBeforeValidator extends Messages {
  constructor(protected ctx: HttpContextContract) {
    super()
  }
  public schema = schema.create({
    img_before: schema.file({
      size: '10mb',
      extnames: ['jpg', 'gif', 'png'],
    }),
  })
}
export class FileAfterValidator extends Messages {
  constructor(protected ctx: HttpContextContract) {
    super()
  }
  public schema = schema.create({
    img_after: schema.file({
      size: '10mb',
      extnames: ['jpg', 'gif', 'png'],
    }),
  })
}

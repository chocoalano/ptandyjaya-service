import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Messages from './Mesages'

export default class UserGroupValidator extends Messages {
  constructor(protected ctx: HttpContextContract) {
    super()
  }

  public schema = schema.create({
    master_group_id: schema.number(),
    user_id: schema
      .array([
        rules.minLength(1)
      ])
      .members(schema.number()),
  })
}

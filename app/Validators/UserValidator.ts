import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Messages from './Mesages'

export class UserValidatorStore extends Messages {
  constructor(protected ctx: HttpContextContract) {
    super()
  }
  public schema = schema.create({
    role_id: schema.number(),
    dept_id: schema.number(),
    name: schema.string(),
    email: schema.string(),
    nik: schema.string(),
    password: schema.string([
      rules.minLength(6),
      rules.confirmed(),
    ]),
    activation: schema.enum(['true', 'false']),
    avatar: schema.file({
      size: '2mb',
      extnames: ['jpg', 'png'],
    }),
    work_location: schema.enum(['office', 'gudang', 'toko']),
    saldo_cuti: schema.number(),
    hp: schema.string([
      rules.minLength(12),
      rules.maxLength(13),
    ]),
    status: schema.string(),
    // tgl_join: schema.date({ format: 'yyyy-MM-dd' }),
    limit_kasbon: schema.number(),
    total_gaji_perbulan: schema.number(),
  })
}

export class UserValidatorUpdate extends Messages {
  constructor(protected ctx: HttpContextContract) {
    super()
  }
  public schema = schema.create({
    role_id: schema.number(),
    dept_id: schema.number(),
    name: schema.string(),
    email: schema.string.nullableAndOptional(),
    nik: schema.string(),
    activation: schema.enum(['true', 'false']),
    work_location: schema.enum(['office', 'gudang', 'toko']),
    saldo_cuti: schema.number(),
    hp: schema.string([
      rules.minLength(12),
      rules.maxLength(13),
    ]),
    status: schema.string(),
    tgl_join: schema.date(),
    limit_kasbon: schema.number(),
    total_gaji_perbulan: schema.number(),
  })
}

export class AvatarValidator extends Messages {
  constructor(protected ctx: HttpContextContract) {
    super()
  }
  public schema = schema.create({
    avatar: schema.file({
      size: '2mb',
      extnames: ['jpg', 'png'],
    }),
  })
}

export class PasswordValidator extends Messages {
  constructor(protected ctx: HttpContextContract) {
    super()
  }
  public schema = schema.create({
    password: schema.string([
      rules.minLength(6),
      rules.confirmed(),
    ]),
  })
}

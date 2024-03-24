import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Dept from '../MasterData/Dept'
import Role from '../MasterData/Role'
import User from '../MasterData/Users/User'

export default class JadwalIstirahat extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public dept_id: number
  @column()
  public role_id: number
  @column()
  public user_id: number
  @column()
  public time: string
  @column.dateTime({ autoCreate: false })
  public date: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Dept, {
    foreignKey: 'dept_id',
  })
  public dept: BelongsTo<typeof Dept>
  @belongsTo(() => Role, {
    foreignKey: 'role_id',
  })
  public role: BelongsTo<typeof Role>
  @belongsTo(() => User, {
    foreignKey: 'user_id',
  })
  public user: BelongsTo<typeof User>
}

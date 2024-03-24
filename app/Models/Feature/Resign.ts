import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from '../MasterData/Users/User'

export default class Resign extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id:number
  @column()
  public alasan:string
  @column()
  public masukan:string
  @column()
  public status_persetujuan:string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User, {
    foreignKey: 'user_id',
  })
  public user: BelongsTo<typeof User>

}

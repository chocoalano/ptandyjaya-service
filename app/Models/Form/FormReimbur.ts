import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from '../MasterData/Users/User'

export default class FormReimbur extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public user_id: number
  @column.dateTime({ autoCreate: false, autoUpdate: false })
  public date: DateTime
  @column()
  public category: string
  @column()
  public file_receipt: string
  @column()
  public transaction_id: string
  @column()
  public user_id_approval: number
  @column()
  public status_approval: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  @belongsTo(() => User, {
    localKey: 'id',
    foreignKey: 'user_id',
  })
  public user: BelongsTo<typeof User>
  @belongsTo(() => User, {
    localKey: 'id',
    foreignKey: 'user_id_approval',
  })
  public userapproval: BelongsTo<typeof User>
}

import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Kasbon from './Kasbon'

export default class AngsuranKasbon extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public kasbon_id: number
  @column()
  public status_pembayaran: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Kasbon, {
    foreignKey: 'kasbon_id',
  })
  public kasbon: BelongsTo<typeof Kasbon>
}

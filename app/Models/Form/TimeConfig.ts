import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class TimeConfig extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public type: string
  @column()
  public jam_mulai: string
  @column()
  public jam_berakhir: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class FormulaGaji extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public variable_name: string
  @column()
  public operator: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

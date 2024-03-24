import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import GajiVariable from './GajiVariable'
import User from '../MasterData/Users/User'

export default class Gaji extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public user_id: number
  @column()
  public total_absen: number
  @column()
  public total_terlambat: number
  @column()
  public total_workday: number
  @column()
  public periode: String
  @column()
  public gaji_perbulan: number
  @column()
  public gaji_perhari: number
  @column()
  public gaji_thp: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => GajiVariable, {
    foreignKey: 'gaji_id',
  })
  public gajivariable: HasMany<typeof GajiVariable>
  @belongsTo(() => User, {
    foreignKey: 'user_id',
  })
  public user: BelongsTo<typeof User>
}

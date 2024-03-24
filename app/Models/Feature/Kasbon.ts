import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import User from '../MasterData/Users/User'
import AngsuranKasbon from './AngsuranKasbon'

export default class Kasbon extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public user_id: number
  @column()
  public nominal_pinjaman: number
  @column()
  public nominal_angsuran: number
  @column()
  public tenor: number
  @column()
  public status_pinjaman: string
  @column()
  public user_id_approval: number
  @column()
  public status_approval: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User, {
    foreignKey: 'user_id',
  })
  public user: BelongsTo<typeof User>

  @hasMany(() => AngsuranKasbon, {
    foreignKey: 'kasbon_id',
  })
  public angsuran: HasMany<typeof AngsuranKasbon>

}

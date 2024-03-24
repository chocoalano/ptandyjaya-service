import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasOne, belongsTo, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import User from './MasterData/Users/User'
import MasterToko from './MasterData/MasterToko'

export default class Absensi extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number
  @column()
  public toko_id: number
  @column()
  public jam_masuk: Date
  @column()
  public jam_pulang: Date
  @column()
  public latitude_masuk: number
  @column()
  public longitude_masuk: number
  @column()
  public status_masuk: string
  @column()
  public waktu_telat_masuk: string
  @column()
  public foto_selfi_masuk: string
  @column()
  public latitude_pulang: number
  @column()
  public longitude_pulang: number
  @column()
  public foto_selfi_pulang: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => User, {
    foreignKey: 'id',
  })
  public users: HasOne<typeof User>
  @belongsTo(() => MasterToko, {
    foreignKey: 'toko_id',
  })
  public toko: BelongsTo<typeof MasterToko>
}

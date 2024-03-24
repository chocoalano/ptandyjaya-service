import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class MasterPelanggan extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nama: string
  @column()
  public email: string
  @column()
  public telp: number
  @column()
  public alamat: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

import { DateTime } from 'luxon'
import { BaseModel, ManyToMany, column, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import UserGudang from './Users/UserGudang'

export default class MasterGudang extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nama: string
  @column()
  public alamat: string
  @column()
  public telepon: string
  @column()
  public latitude: string
  @column()
  public longitude: string
  @column()
  public radius_forabsen: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => UserGudang, {
    localKey: 'id',
    pivotForeignKey: 'master_gudang_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'user_id',
    pivotTable: 'user_gudangs',
  })
  public user_gudang: ManyToMany<typeof UserGudang>
}

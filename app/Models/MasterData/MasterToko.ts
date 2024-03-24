import { DateTime } from 'luxon'
import { BaseModel, ManyToMany, column, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import UserToko from './Users/UserToko'

export default class MasterToko extends BaseModel {
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

  @manyToMany(() => UserToko, {
    localKey: 'id',
    pivotForeignKey: 'master_toko_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'user_id',
    pivotTable: 'user_tokos',
  })
  public user_toko: ManyToMany<typeof UserToko>
}

import { DateTime } from 'luxon'
import { BaseModel, ManyToMany, column, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import UserOffice from './Users/UserOffice'

export default class MasterOffice extends BaseModel {
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

  @manyToMany(() => UserOffice, {
    localKey: 'id',
    pivotForeignKey: 'master_office_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'user_id',
    pivotTable: 'user_offices',
  })
  public user_office: ManyToMany<typeof UserOffice>
}

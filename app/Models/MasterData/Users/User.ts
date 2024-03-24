import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel,  belongsTo, BelongsTo, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Role from '../Role'
import Dept from '../Dept'
import Absensi from '../../Absensi'
import UserGroup from './UserGroup'
import UserGudang from './UserGudang'
import UserOffice from './UserOffice'
import MasterToko from '../MasterToko'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public role_id: number
  
  @column()
  public dept_id: number

  @column()
  public name: string

  @column()
  public email: string
  
  @column()
  public nik: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public activation: string

  @column()
  public avatar: string

  @column()
  public work_location: string

  @column()
  public saldo_cuti: number

  @column()
  public hp: string

  @column()
  public status: string
  
  @column()
  public tgl_join: Date

  @column()
  public limit_kasbon: number
  @column()
  public total_gaji_perbulan: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  // relationship

  @belongsTo(() => Role, {
    foreignKey: 'role_id',
  })
  public roles: BelongsTo<typeof Role>

  @belongsTo(() => Absensi, {
    foreignKey: 'id',
  })
  public absensis: BelongsTo<typeof Absensi>

  @belongsTo(() => Dept, {
    foreignKey: 'dept_id',
  })
  public dept: BelongsTo<typeof Dept>

  @manyToMany(() => UserGroup, {
    pivotTable: 'user_groups',
  })
  public user_groups: ManyToMany<typeof UserGroup>

  @manyToMany(() => UserGudang, {
    pivotTable: 'user_gudangs',
  })
  public user_gudang: ManyToMany<typeof UserGudang>

  @manyToMany(() => UserOffice, {
    pivotTable: 'user_offices',
  })
  public user_office: ManyToMany<typeof UserOffice>

  @manyToMany(() => MasterToko, {
    pivotTable: 'user_tokos',
  })
  public user_toko: ManyToMany<typeof MasterToko>
}

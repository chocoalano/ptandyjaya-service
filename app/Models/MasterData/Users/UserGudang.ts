import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import MasterGudang from '../MasterGudang'
import User from './User'

export default class UserGudang extends BaseModel {
  @column()
  public master_gudang_id: number
  @column()
  public user_id: number
  
  @belongsTo(() => MasterGudang, {
    foreignKey: 'master_gudang_id',
  })
  public gudang: BelongsTo<typeof MasterGudang>
  @belongsTo(() => User, {
    foreignKey: 'user_id',
  })
  public user: BelongsTo<typeof User>
}

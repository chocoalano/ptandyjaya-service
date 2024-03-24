import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import MasterToko from '../MasterToko'
import User from './User'

export default class UserToko extends BaseModel {
  @column()
  public master_toko_id: number
  @column()
  public user_id: number

  @belongsTo(() => MasterToko, {
    foreignKey: 'master_office_id',
  })
  public toko: BelongsTo<typeof MasterToko>
  @belongsTo(() => User, {
    foreignKey: 'user_id',
  })
  public user: BelongsTo<typeof User>
}

import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import MasterGroup from '../../Form/MasterGroup'
import User from './User'

export default class UserGroup extends BaseModel {
  @column()
  public master_group_id: number
  @column()
  public user_id: number

  @belongsTo(() => MasterGroup, {
    foreignKey: 'master_group_id',
  })
  public master_group: BelongsTo<typeof MasterGroup>
  @belongsTo(() => User, {
    foreignKey: 'user_id',
  })
  public user: BelongsTo<typeof User>
}

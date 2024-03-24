import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import MasterOffice from '../MasterOffice'
import User from './User'

export default class UserOffice extends BaseModel {
  @column()
  public master_office_id: number
  @column()
  public user_id: number

  @belongsTo(() => MasterOffice, {
    foreignKey: 'master_office_id',
  })
  public office: BelongsTo<typeof MasterOffice>
  @belongsTo(() => User, {
    foreignKey: 'user_id',
  })
  public user: BelongsTo<typeof User>
}

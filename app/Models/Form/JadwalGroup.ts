import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import MasterGroup from './MasterGroup'
import TimeConfig from './TimeConfig'

export default class JadwalGroup extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public master_group_id: number
  @column()
  public time_config_id: number
  @column.dateTime({ autoCreate: false, autoUpdate: false })
  public date: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => MasterGroup, {
    foreignKey: 'master_group_id',
  })
  public master_group: BelongsTo<typeof MasterGroup>
  @belongsTo(() => TimeConfig, {
    foreignKey: 'time_config_id',
  })
  public time_config: BelongsTo<typeof TimeConfig>
}

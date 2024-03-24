import { DateTime } from 'luxon'
import { BaseModel, HasMany, ManyToMany, column, hasMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import UserGroup from '../MasterData/Users/UserGroup'

export default class MasterGroup extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public user_id_kepgroup: number
  @column()
  public nama: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => UserGroup, {
    localKey: 'id',
    pivotForeignKey: 'master_group_id',
    relatedKey: 'master_group_id',
    pivotRelatedForeignKey: 'user_id',
    pivotTable: 'user_groups',
  })
  public members: ManyToMany<typeof UserGroup>

  @hasMany(() => UserGroup, {
    localKey: 'id',
    foreignKey: 'master_group_id',
    onQuery(query) {
      if (!query.isRelatedSubQuery) {
        query
          .preload('user')
      }
    }
  })
  public membersTeams: HasMany<typeof UserGroup>
}

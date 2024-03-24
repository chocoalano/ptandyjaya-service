import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import Gaji from './Gaji';


export default class GajiVariable extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public gaji_id: number
  @column()
  public variable_gaji_id: number
  @column()
  public bobot: number
  @column()
  public nominal: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Gaji, {
    foreignKey: 'dept_id',
  })
  public gaji: BelongsTo<typeof Gaji>
}

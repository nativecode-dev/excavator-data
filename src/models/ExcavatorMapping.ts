import { BelongsTo, Column, ForeignKey, HasOne, Table, Unique } from 'sequelize-typescript'
import { DefinitionValue } from './DefinitionValue'
import { Excavator } from './Excavator'
import { Model } from './Model'
import { Site } from './Site'

@Table
export class ExcavatorMapping extends Model<ExcavatorMapping> {
  @BelongsTo(() => Excavator)
  public excavator: Excavator

  @ForeignKey(() => Excavator)
  @Column
  public excavatorId: number

  @BelongsTo(() => DefinitionValue)
  public definitionValue: DefinitionValue

  @ForeignKey(() => DefinitionValue)
  @Column
  public definitionValueId: number

  protected typename(): string {
    return 'ExcavatorMapping'
  }
}

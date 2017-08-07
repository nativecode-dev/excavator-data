import { BelongsTo, Column, ForeignKey, Table, Unique } from 'sequelize-typescript'
import { Definition } from './Definition'
import { Model } from './Model'

export enum DefinitionValueType {
  Action = 0,
  Input = 1,
}

@Table
export class DefinitionValue extends Model<DefinitionValue> {
  @BelongsTo(() => Definition)
  public definition: Definition

  @ForeignKey(() => Definition)
  @Column
  public definitionId: number

  @Column
  public description: string

  @Column
  public name: string

  @Column
  public semantic: string

  @Column
  public type: DefinitionValueType

  protected typename(): string {
    return 'DefinitionValue'
  }
}

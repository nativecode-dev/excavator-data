import { BelongsTo, Column, ForeignKey, Table, Unique } from 'sequelize-typescript'
import { Definition } from './Definition'
import { DefinitionValueType } from './DefinitionValueType'
import { IDefinitionValue } from './interfaces'
import { Model } from './Model'

/**
 * A value attached to a definition that defines the semantic
 * meaning of a field name or id.
 * @export
 * @class DefinitionValue
 * @extends {Model<DefinitionValue>}
 */
@Table
export class DefinitionValue extends Model<DefinitionValue> implements IDefinitionValue {
  /**
   * @name definition
   * @type {Definition}
   * @memberOf DefinitionValue
   */
  @BelongsTo(() => Definition)
  public definition: Definition

  /**
   * @type {number}
   * @memberOf DefinitionValue
   */
  @ForeignKey(() => Definition)
  @Column
  public definitionId: number

  /**
   * @type {string}
   * @memberOf DefinitionValue
   */
  @Column
  public description: string

  /**
   * @type {string}
   * @memberOf DefinitionValue
   */
  @Column
  public name: string

  /**
   * @type {string}
   * @memberOf DefinitionValue
   */
  @Column
  public semantic: string

  /**
   * @type {DefinitionValueType}
   * @memberOf DefinitionValue
   */
  @Column
  public type: DefinitionValueType

  protected typename(): string {
    return 'DefinitionValue'
  }
}

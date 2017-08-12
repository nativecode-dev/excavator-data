import { BelongsTo, Column, ForeignKey, Table, Unique } from 'sequelize-typescript'
import { Definition } from './Definition'
import { Model } from './Model'

/**
 * Represents what the value is mapped to, which can
 * either be an action or act as input.
 * @export
 * @enum {number}
 */
export enum DefinitionValueType {
  Action = 0,
  Input = 1,
}

/**
 * A value attached to a definition that defines the semantic
 * meaning of a field name or id.
 * @export
 * @class DefinitionValue
 * @extends {Model<DefinitionValue>}
 */
@Table
export class DefinitionValue extends Model<DefinitionValue> {
  @BelongsTo(() => Definition)
  /**
   * @type {Definition}
   * @memberOf DefinitionValue
   */
  public definition: Definition

  @ForeignKey(() => Definition)
  @Column
  /**
   * @type {number}
   * @memberOf DefinitionValue
   */
  public definitionId: number

  @Column
  /**
   * @type {string}
   * @memberOf DefinitionValue
   */
  public description: string

  @Column
  /**
   * @type {string}
   * @memberOf DefinitionValue
   */
  public name: string

  @Column
  /**
   * @type {string}
   * @memberOf DefinitionValue
   */
  public semantic: string

  @Column
  /**
   * @type {DefinitionValueType}
   * @memberOf DefinitionValue
   */
  public type: DefinitionValueType

  protected typename(): string {
    return 'DefinitionValue'
  }
}

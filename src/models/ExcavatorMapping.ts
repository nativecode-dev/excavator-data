import { BelongsTo, Column, ForeignKey, HasOne, Table, Unique } from 'sequelize-typescript'
import { DefinitionValue } from './DefinitionValue'
import { Excavator } from './Excavator'
import { IExcavatorMapping } from './interfaces'
import { Model } from './Model'
import { Site } from './Site'

/**
 * Represents a mapping between a site's form field and a conceptual
 * semantic field from a definition value.
 * @export
 * @class ExcavatorMapping
 * @extends {Model<ExcavatorMapping>}
 */
@Table
export class ExcavatorMapping extends Model<ExcavatorMapping> implements IExcavatorMapping {
  /**
   * @type {DefinitionValue}
   * @memberOf ExcavatorMapping
   */
  @BelongsTo(() => DefinitionValue)
  public definitionValue: DefinitionValue

  /**
   * @type {number}
   * @memberOf ExcavatorMapping
   */
  @ForeignKey(() => DefinitionValue)
  @Column
  public definitionValueId: number

  /**
   * @type {Excavator}
   * @memberOf ExcavatorMapping
   */
  @BelongsTo(() => Excavator)
  public excavator: Excavator

  /**
   * @type {number}
   * @memberOf ExcavatorMapping
   */
  @ForeignKey(() => Excavator)
  @Column
  public excavatorId: number

  protected typename(): string {
    return 'ExcavatorMapping'
  }
}

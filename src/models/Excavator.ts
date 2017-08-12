import { Column, HasMany, Table, Unique } from 'sequelize-typescript'
import { ExcavatorMapping } from './ExcavatorMapping'
import { Model } from './Model'

/**
 * An excavator is a set of mappings between the conceptual semantic
 * fields from a definition against a site's form field.
 * @export
 * @class Excavator
 * @extends {Model<Excavator>}
 */
@Table
export class Excavator extends Model<Excavator> {
  /**
   * @type {string}
   * @memberOf Excavator
   */
  @Column
  public description: string

  /**
   * @type {ExcavatorMapping[]}
   * @memberOf Excavator
   */
  @HasMany(() => ExcavatorMapping)
  public excavatorMappings: ExcavatorMapping[]

  /**
   * @type {string}
   * @memberOf Excavator
   */
  @Unique
  @Column
  public name: string

  protected typename(): string {
    return 'Excavator'
  }
}

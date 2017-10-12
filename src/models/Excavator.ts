import { Column, HasMany, Table, Unique } from 'sequelize-typescript'
import { ExcavatorMapping } from './ExcavatorMapping'
import { IExcavator } from './interfaces'
import { Model } from './Model'

/**
 * An excavator is a set of mappings between the conceptual semantic
 * fields from a definition against a site's form field.
 * @export
 * @class Excavator
 * @extends {Model<Excavator>}
 */
@Table
export class Excavator extends Model<Excavator> implements IExcavator {
  /**
   * @type {string}
   * @memberOf Excavator
   */
  @Column
  public description: string

  @HasMany(() => ExcavatorMapping)
  /**
   * @type {ExcavatorMapping[]}
   * @memberOf Excavator
   */
  public mappings: ExcavatorMapping[]

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

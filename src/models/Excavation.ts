import { Column, ForeignKey, IsUrl, Table } from 'sequelize-typescript'
import { Excavator } from './Excavator'
import { Model } from './Model'

/**
 * An excavation represents the state of a scraping operation.
 * @export
 * @class Excavation
 * @extends {Model<Excavation>}
 */
@Table
export class Excavation extends Model<Excavation> {
  /**
   * @type {number}
   * @memberOf Excavation
   */
  @ForeignKey(() => Excavator)
  @Column
  public excavatorId: number

  /**
   * @type {string}
   * @memberOf Excavation
   */
  @IsUrl
  @Column
  public url: string

  protected typename(): string {
    return 'Excavation'
  }
}

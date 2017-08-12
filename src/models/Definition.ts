import { Column, HasMany, Table, Unique } from 'sequelize-typescript'
import { DefinitionValue } from './DefinitionValue'
import { Model } from './Model'

/**
 * A collection of field definitions.
 * @export
 * @class Definition
 * @extends {Model<Definition>}
 */
@Table
export class Definition extends Model<Definition> {
  @Column
  /**
   * @type {string}
   * @memberOf Definition
   */
  public description: string

  @Unique
  @Column
  /**
   * @type {string}
   * @memberOf Definition
   */
  public name: string

  @HasMany(() => DefinitionValue)
  /**
   * @type {DefinitionValue[]}
   * @memberOf Definition
   */
  public values: DefinitionValue[]

  protected typename(): string {
    return 'Definition'
  }
}

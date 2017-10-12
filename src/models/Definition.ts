import { Column, HasMany, Table, Unique } from 'sequelize-typescript'
import { DefinitionValue } from './DefinitionValue'
import { IDefinition, IDefinitionValue } from './interfaces'
import { Model } from './Model'

/**
 * A collection of field definitions.
 * @export
 * @class Definition
 * @extends {Model<Definition>}
 */
@Table
export class Definition extends Model<Definition> implements IDefinition {
  /**
   * @type {string}
   * @memberOf Definition
   */
  @Column
  public description: string

  /**
   * @type {string}
   * @memberOf Definition
   */
  @Unique
  @Column
  public name: string

  /**
   * @name values
   * @type {DefinitionValue[]}
   * @memberOf Definition
   */
  @HasMany(() => DefinitionValue)
  public values: DefinitionValue[]

  protected typename(): string {
    return 'Definition'
  }
}

import { BelongsTo, Column, ForeignKey, Table, Unique } from 'sequelize-typescript'
import { Model } from './Model'
import { SiteFormField } from './SiteFormField'

/**
 * @export
 * @class SiteFormFieldAttribute
 * @extends {Model<SiteFormFieldAttribute>}
 */
@Table
export class SiteFormFieldAttribute extends Model<SiteFormFieldAttribute> {
  /**
   * @type {SiteFormField}
   * @memberOf SiteFormFieldAttribute
   */
  @BelongsTo(() => SiteFormField)
  public siteFormField: SiteFormField

  /**
   * @type {number}
   * @memberOf SiteFormFieldAttribute
   */
  @ForeignKey(() => SiteFormField)
  public siteFormFieldId: number

  /**
   * @type {string}
   * @memberOf SiteFormFieldAttribute
   */
  @Column
  public name: string

  /**
   * @type {string}
   * @memberOf SiteFormFieldAttribute
   */
  @Column
  public value: string

  protected typename(): string {
    return 'SiteFormFieldAttribute'
  }
}

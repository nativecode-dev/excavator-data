import { BelongsTo, Column, ForeignKey, HasMany, Table, Unique } from 'sequelize-typescript'
import { ISiteFormField } from './interfaces'
import { Model } from './Model'
import { SiteForm } from './SiteForm'
import { SiteFormFieldAttribute } from './SiteFormFieldAttribute'

/**
 * @export
 * @class SiteFormField
 * @extends {Model<SiteFormField>}
 */
@Table
export class SiteFormField extends Model<SiteFormField> implements ISiteFormField {
  /**
   * @type {SiteFormFieldAttribute[]}
   * @memberOf SiteFormField
   */
  @HasMany(() => SiteFormFieldAttribute)
  public attributes: SiteFormFieldAttribute[]

  /**
   * @type {SiteForm}
   * @memberOf SiteFormField
   */
  @BelongsTo(() => SiteForm)
  public form: SiteForm

  /**
   * @type {number}
   * @memberOf SiteFormField
   */
  @ForeignKey(() => SiteForm)
  @Column
  public formId: number

  /**
   * @type {string}
   * @memberOf SiteFormField
   */
  @Column
  public selector: string

  /**
   * @type {string}
   * @memberOf SiteFormField
   */
  @Column
  public tag: string

  protected typename(): string {
    return 'SiteFormField'
  }
}

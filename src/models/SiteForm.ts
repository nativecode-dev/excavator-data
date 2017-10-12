import { BelongsTo, Column, ForeignKey, HasMany, Table, Unique } from 'sequelize-typescript'
import { HttpMethod } from './HttpMethod'
import { ISiteForm } from './interfaces'
import { Model } from './Model'
import { Site } from './Site'
import { SiteFormField } from './SiteFormField'

/**
 * @export
 * @class SiteForm
 * @extends {Model<SiteForm>}
 */
@Table
export class SiteForm extends Model<SiteForm> implements ISiteForm {
  /**
   * @type {SiteFormField[]}
   * @memberOf SiteForm
   */
  @HasMany(() => SiteFormField)
  public fields: SiteFormField[]

  /**
   * @type {HttpMethod}
   * @memberOf SiteForm
   */
  @Column
  public method: HttpMethod

  /**
   * @type {string}
   * @memberOf SiteForm
   */
  @Column
  public selector: string

  /**
   * @type {Site}
   * @memberOf SiteForm
   */
  @BelongsTo(() => Site)
  public site: Site

  /**
   * @type {number}
   * @memberOf SiteForm
   */
  @ForeignKey(() => Site)
  @Column
  public siteId: number

  protected typename(): string {
    return 'SiteForm'
  }
}

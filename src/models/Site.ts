import { Column, HasMany, Table, Unique } from 'sequelize-typescript'
import { Model } from './Model'
import { SiteForm } from './SiteForm'

/**
 * @export
 * @class Site
 * @extends {Model<Site>}
 */
@Table
export class Site extends Model<Site> {
  /**
   * @type {string}
   * @memberOf Site
   */
  @Column
  public description: string

  /**
   * @type {SiteForm[]}
   * @memberOf Site
   */
  @HasMany(() => SiteForm)
  public forms: SiteForm[]

  protected typename(): string {
    return 'Site'
  }
}

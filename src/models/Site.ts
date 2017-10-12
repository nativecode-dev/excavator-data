import { Column, HasMany, Table, Unique } from 'sequelize-typescript'
import { ISite } from './interfaces'
import { Model } from './Model'
import { SiteForm } from './SiteForm'

/**
 * @export
 * @class Site
 * @extends {Model<Site>}
 */
@Table
export class Site extends Model<Site> implements ISite {
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

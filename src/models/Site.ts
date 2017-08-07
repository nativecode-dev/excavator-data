import { Column, HasMany, Table, Unique } from 'sequelize-typescript'
import { Model } from './Model'
import { SiteForm } from './SiteForm'

@Table
export class Site extends Model<Site> {
  @Column
  public description: string

  @HasMany(() => SiteForm)
  public forms: SiteForm[]

  protected typename(): string {
    return 'Site'
  }
}

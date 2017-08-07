import { BelongsTo, Column, ForeignKey, HasMany, Table, Unique } from 'sequelize-typescript'
import { HttpMethod } from './Enums'
import { Model } from './Model'
import { Site } from './Site'
import { SiteFormField } from './SiteFormField'

@Table
export class SiteForm extends Model<SiteForm> {
  @HasMany(() => SiteFormField)
  public fields: SiteFormField[]

  @Column
  public method: HttpMethod

  @Column
  public selector: string

  @BelongsTo(() => Site)
  public site: Site

  @ForeignKey(() => Site)
  @Column
  public siteId: number

  protected typename(): string {
    return 'SiteForm'
  }
}

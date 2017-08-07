import { BelongsTo, Column, ForeignKey, Table, Unique } from 'sequelize-typescript'
import { Model } from './Model'
import { SiteFormField } from './SiteFormField'

@Table
export class SiteFormFieldAttribute extends Model<SiteFormFieldAttribute> {
  @BelongsTo(() => SiteFormField)
  public siteFormField: SiteFormField

  @ForeignKey(() => SiteFormField)
  public siteFormFieldId: number

  @Column
  public name: string

  @Column
  public value: string

  protected typename(): string {
    return 'SiteFormFieldAttribute'
  }
}

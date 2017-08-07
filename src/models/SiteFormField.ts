import { BelongsTo, Column, ForeignKey, HasMany, Table, Unique } from 'sequelize-typescript'
import { Model } from './Model'
import { SiteForm } from './SiteForm'
import { SiteFormFieldAttribute } from './SiteFormFieldAttribute'

@Table
export class SiteFormField extends Model<SiteFormField> {
  @HasMany(() => SiteFormFieldAttribute)
  public attributes: SiteFormFieldAttribute[]

  @BelongsTo(() => SiteForm)
  public form: SiteForm

  @ForeignKey(() => SiteForm)
  @Column
  public formId: number

  @Column
  public selector: string

  @Column
  public tag: string

  protected typename(): string {
    return 'SiteFormField'
  }
}

import { IModel } from './IModel'

export interface ISiteFormFieldAttribute extends IModel {
  name: string
  siteFormFieldId: number
  value: string
}

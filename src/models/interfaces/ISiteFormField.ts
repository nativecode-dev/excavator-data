import { IModel } from './IModel'
import { ISiteFormFieldAttribute } from './ISiteFormFieldAttribute'

export interface ISiteFormField extends IModel {
  attributes: ISiteFormFieldAttribute[]
  formId: number
  selector: string
  tag: string
}

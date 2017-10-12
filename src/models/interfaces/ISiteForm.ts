import { HttpMethod } from '../HttpMethod'
import { IModel } from './IModel'
import { ISiteFormField } from './ISiteFormField'

export interface ISiteForm extends IModel {
  fields: ISiteFormField[]
  method: HttpMethod
  selector: string
  siteId: number
}

import { IModel } from './IModel'
import { ISiteForm } from './ISiteForm'

export interface ISite extends IModel {
  description: string
  forms: ISiteForm[]
}

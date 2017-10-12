import { IExcavatorMapping } from './IExcavatorMapping'
import { IModel } from './IModel'

export interface IExcavator extends IModel {
  description: string
  mappings: IExcavatorMapping[]
  name: string
}

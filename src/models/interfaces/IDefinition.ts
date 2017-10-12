import { IDefinitionValue } from './IDefinitionValue'
import { IModel } from './IModel'

export interface IDefinition extends IModel {
  description: string
  name: string
  values: IDefinitionValue[]
}

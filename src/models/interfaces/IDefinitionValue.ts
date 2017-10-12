import { DefinitionValueType } from '../DefinitionValueType'
import { IModel } from './IModel'

export interface IDefinitionValue extends IModel {
  definitionId: number
  description: string
  name: string
  semantic: string
  type: DefinitionValueType
}

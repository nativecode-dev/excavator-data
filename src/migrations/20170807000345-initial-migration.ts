import * as sqlts from 'sequelize-typescript'

import { QueryInterface, Sequelize } from 'sequelize'
import { DataType } from 'sequelize-typescript'
import { Logger } from '../logging'
import { Definition } from '../models/index'

const definition = (): string => {
  const name: string | any = Definition.getTableName()

  if (typeof name === 'string') {
    return name
  }
  return name.tableName
}

export const down = async (query: QueryInterface, sql: Sequelize): Promise<void> => {
  await Definition.drop()
}

export const up = async (query: QueryInterface, sql: Sequelize): Promise<void> => {
  await Definition.sync()
}

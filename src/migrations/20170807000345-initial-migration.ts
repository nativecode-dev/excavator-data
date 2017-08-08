import * as Models from '../models/index'

import { QueryInterface, Sequelize } from 'sequelize'

export const down = async (query: QueryInterface, sql: Sequelize): Promise<void> => {
  const indexed: { [key: string]: any } = Models
  await Promise.all(Object.keys(Models)
    .filter((key: string): boolean => indexed[key].drop)
    .map((key: string) => indexed[key].drop()))
}

export const up = async (query: QueryInterface, sql: Sequelize): Promise<void> => {
  const indexed: { [key: string]: any } = Models
  await Promise.all(Object.keys(Models)
    .filter((key: string) => indexed[key].sync)
    .map((key: string) => indexed[key].sync()))
}

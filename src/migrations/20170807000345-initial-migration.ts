import * as Models from '../models/index'

import { QueryInterface, Sequelize } from 'sequelize'

export const down = async (query: QueryInterface, sql: Sequelize): Promise<void> => {
  await Promise.all(Object.keys(Models)
    .filter((key: string) => Models[key].drop)
    .map((key: string) => Models[key].drop()))
}

export const up = async (query: QueryInterface, sql: Sequelize): Promise<void> => {
  await Promise.all(Object.keys(Models)
    .filter((key: string) => Models[key].sync)
    .map((key: string) => Models[key].sync()))
}

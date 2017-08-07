export * from './Definition'

import * as fs from 'fs'
import * as path from 'path'
import * as Models from './index'

import { ISequelizeConfig, Sequelize } from 'sequelize-typescript'
import { Logger } from '../logging'

const filename: string = path.resolve(__dirname, '../../config/config.json')
const env: string = process.env.EXCAVATOR_ENV || 'development'
const config: ISequelizeConfig = JSON.parse(fs.readFileSync(filename).toString())[env]

Logger.debug('sequelize', env, config)
const sqlts: Sequelize = new Sequelize(config)

sqlts.addModels([
  Models.Definition,
])

export const sequelize: Sequelize = sqlts

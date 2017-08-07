export * from './Definition'
export * from './DefinitionValue'
export * from './Enums'
export * from './Excavation'
export * from './Excavator'
export * from './ExcavatorMapping'
export * from './Site'
export * from './SiteForm'
export * from './SiteFormField'
export * from './SiteFormFieldAttribute'

import * as fs from 'fs'
import * as path from 'path'
import * as Models from './index'

import { ISequelizeConfig, Sequelize } from 'sequelize-typescript'
import { Logger } from '../logging'

const filename: string = path.resolve(__dirname, '../config/config.json')
const env: string = process.env.EXCAVATOR_ENV || 'development'
const config: ISequelizeConfig = JSON.parse(fs.readFileSync(filename).toString())[env]

Logger.debug('sequelize', env, config)
const sqlts: Sequelize = new Sequelize(config)

const models: any[] = Object.keys(Models)
  .filter((key: string) => Models[key].sync)
  .map((key: string) => Models[key])

sqlts.addModels(models)

export const sequelize: Sequelize = sqlts

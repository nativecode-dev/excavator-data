export * from './Definition'

import * as fs from 'fs'
import * as path from 'path'
import * as Models from './Index'

import { ISequelizeConfig, Sequelize } from 'sequelize-typescript'

const filename: string = path.resolve(__dirname, '../config/config.json')
const env: string = process.env.EXCAVATOR_ENV || 'develop'
const config: ISequelizeConfig = JSON.parse(fs.readFileSync(filename).toString())[env]

const sqlts: Sequelize = new Sequelize(config)

sqlts.addModels([
  Models.Definition,
])

export const sequelize: Sequelize = sqlts

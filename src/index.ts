export * from './config'
export * from './models/index'
export * from './repository'
export * from './server'

import * as Umzug from 'umzug'

import { Sequelize } from 'sequelize-typescript'
import { GetConfig, IConfiguration } from './config'
import { Logger } from './logging'
import { GetRepository, GetUmzugConfigs } from './repository'

export const MigrateDown = async (sequelize?: Sequelize): Promise<void> => {
  const config: IConfiguration = await GetConfig()
  const sqlts: Sequelize = sequelize || await GetRepository(config)
  const [migrations, seeders] = GetUmzugConfigs(sqlts)
  await seeders.down()
  await migrations.down()
}

export const MigrateList = async (sequelize?: Sequelize): Promise<Umzug.Migration[]> => {
  const config: IConfiguration = await GetConfig()
  const sqlts: Sequelize = sequelize || await GetRepository(config)
  const [migrations, seeders] = GetUmzugConfigs(sqlts)
  const pendingMigrations: Umzug.Migration[] = await migrations.pending()
  const pendingSeeders: Umzug.Migration[] = await seeders.pending()
  return [...pendingMigrations, ...pendingSeeders]
}

export const MigrateUp = async (sequelize?: Sequelize): Promise<void> => {
  const config: IConfiguration = await GetConfig()
  const sqlts: Sequelize = sequelize || await GetRepository(config)
  const [migrations, seeders] = GetUmzugConfigs(sqlts)
  await migrations.up()
  await seeders.up()
}

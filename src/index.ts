export * from './config'
export * from './models/index'
export * from './repository'

import * as Umzug from 'umzug'

import { Sequelize } from 'sequelize-typescript'
import { GetConfig, IConfiguration } from './config'
import { Logger } from './logging'
import { GetRepository, GetUmzugConfigs } from './repository'

export
  /**
   * Reverses migrations.
   * @param {Sequelize} [sequelize]
   * @returns {Promise<void>}
   */
  const MigrateDown = async (sequelize?: Sequelize): Promise<void> => {
    const config: IConfiguration = await GetConfig()
    const sqlts: Sequelize = sequelize || await GetRepository(config)
    const [migrations, seeders] = GetUmzugConfigs(sqlts)
    await seeders.down()
    await migrations.down()
  }

export
  /**
   * Returns a list of migrations that can be run against the database.
   * @param {Sequelize} [sequelize]
   * @returns {Promise<Umzug.Migration[]>}
   */
  const MigrateList = async (sequelize?: Sequelize): Promise<Umzug.Migration[]> => {
    const config: IConfiguration = await GetConfig()
    const sqlts: Sequelize = sequelize || await GetRepository(config)
    const [migrations, seeders] = GetUmzugConfigs(sqlts)
    const pendingMigrations: Umzug.Migration[] = await migrations.pending()
    const pendingSeeders: Umzug.Migration[] = await seeders.pending()
    return [...pendingMigrations, ...pendingSeeders]
  }

export
  /**
   * Runs available migrations against the database.
   * @param {Sequelize} [sequelize]
   * @returns {Promise<void>}
   */
  const MigrateUp = async (sequelize?: Sequelize): Promise<void> => {
    const config: IConfiguration = await GetConfig()
    const sqlts: Sequelize = sequelize || await GetRepository(config)
    const [migrations, seeders] = GetUmzugConfigs(sqlts)
    await migrations.up()
    await seeders.up()
  }

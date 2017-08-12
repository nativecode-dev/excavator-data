import * as path from 'path'
import * as Umzug from 'umzug'
import * as Models from './models/index'

import { Sequelize } from 'sequelize-typescript'
import { GetConfig, IConfiguration } from './config'
import { Logger } from './logging'

export
  /**
   * @param {Sequelize} sequelize
   * @returns {Umzug.Umzug[]}
   */
  const GetUmzugConfigs = (sequelize: Sequelize): Umzug.Umzug[] => {
    const common: Umzug.UmzugOptions = {
      migrations: {
        params: [
          sequelize.getQueryInterface(),
          Sequelize,
        ],
        path: path.join(__dirname, 'migrations'),
        pattern: /\d{14}-\w+-migration\.ts$/,
      },
      storage: 'sequelize',
      storageOptions: {
        sequelize,
      },
    }

    const migrations: Umzug.Umzug = new Umzug(Object.assign({
      logging: (...args: any[]): void => Logger.debug('migrations', ...args),
      migrations: {
        path: path.join(__dirname, 'migrations'),
        pattern: /\d{14}-\w+-migration\.ts$/,
      },
    }, common))

    const seeders: Umzug.Umzug = new Umzug(Object.assign({
      logging: (...args: any[]): void => Logger.debug('seeders', ...args),
      migrations: {
        path: path.join(__dirname, 'seeders'),
        pattern: /\d{14}-\w+-seeder\.ts$/,
      },
    }, common))

    return [migrations, seeders]
  }

export
  /**
   * @param {IConfiguration} [config]
   * @returns {Promise<Sequelize>}
   */
  const GetRepository = async (config?: IConfiguration): Promise<Sequelize> => {
    const configuration: IConfiguration = config || await GetConfig()

    Logger.debug('Creating Sequelize instance', configuration.db)
    const sequelize: Sequelize = new Sequelize(configuration.db)

    const indexer: { [key: string]: any } = Models
    const models: any[] = Object.keys(Models)
      .filter((key: string) => indexer[key].sync)
      .map((key: string) => indexer[key])

    sequelize.addModels(models)
    return sequelize
  }

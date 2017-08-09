export * from './config'
export * from './models/index'

import * as path from 'path'
import * as Umzug from 'umzug'
import * as Models from './models/index'

import { Sequelize } from 'sequelize-typescript'
import { GetConfig, IConfiguration } from './config'
import { Logger } from './logging'

const GetUmzugConfigs = (sequelize: Sequelize): Umzug.Umzug[] => {
  const common = {
    logging: (...args: any[]): void => Logger.debug('migrations', ...args),
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

  const migrations = new Umzug(Object.assign({
    logging: (...args: any[]): void => Logger.debug('migrations', ...args),
    migrations: {
      path: path.join(__dirname, 'migrations'),
      pattern: /\d{14}-\w+-migration\.ts$/,
    },
  }, common))

  const seeders = new Umzug(Object.assign({
    logging: (...args: any[]): void => Logger.debug('seeders', ...args),
    migrations: {
      path: path.join(__dirname, 'seeders'),
      pattern: /\d{14}-\w+-seeder\.ts$/,
    },
  }, common))

  return [migrations, seeders]
}

export const GetRepository = async (config?: IConfiguration): Promise<Sequelize> => {
  const configuration: IConfiguration = await GetConfig()

  Logger.debug('Creating Sequelize instance', configuration.db)
  const sequelize: Sequelize = new Sequelize(configuration.db)

  const indexer: { [key: string]: any } = Models
  const models: any[] = Object.keys(Models)
    .filter((key: string) => indexer[key].sync)
    .map((key: string) => indexer[key])

  sequelize.addModels(models)
  return sequelize
}

const Migrator = (config?: IConfiguration): Promise<Umzug.Umzug[]> => {
  return GetRepository(config).then((sequelize: Sequelize): Umzug.Umzug[] => GetUmzugConfigs(sequelize))
}

export const MigrateDown = async (config?: IConfiguration): Promise<void> => {
  const [migrations, seeders] = await Migrator(config)
  await seeders.down()
  await migrations.down()
}

export const MigrateList = async (config?: IConfiguration): Promise<Umzug.Migration[]> => {
  const [migrations, seeders] = await Migrator(config)
  const pendingMigrations: Umzug.Migration[] = await migrations.pending()
  return pendingMigrations.concat(await seeders.pending())
}

export const MigrateUp = async (config?: IConfiguration): Promise<void> => {
  const [migrations, seeders] = await Migrator(config)
  await migrations.up()
  await seeders.up()
}

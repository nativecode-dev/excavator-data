export * from './config'
export * from './models/index'

import * as path from 'path'
import * as Umzug from 'umzug'
import * as Models from './models/index'

import { Sequelize } from 'sequelize-typescript'
import { Configuration, IConfiguration } from './config'
import { Logger } from './logging'

const umzugs = (sequelize: Sequelize): Umzug.Umzug[] => {
  const migrations = new Umzug({
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
  })

  const seeders = new Umzug({
    logging: (...args: any[]): void => Logger.debug('seeders', ...args),
    migrations: {
      params: [
        sequelize.getQueryInterface(),
        Sequelize,
      ],
      path: path.join(__dirname, 'seeders'),
      pattern: /\d{14}-\w+-seeder\.ts$/,
    },
    storage: 'sequelize',
    storageOptions: {
      sequelize,
    },
  })

  return [migrations, seeders]
}

export const Migrator = (config?: IConfiguration): Promise<Umzug.Umzug[]> => {
  return Repository(config).then((sequelize: Sequelize): Umzug.Umzug[] => umzugs(sequelize))
}

export const Repository = async (config?: IConfiguration): Promise<Sequelize> => {
  const configuration: IConfiguration = await Configuration()

  Logger.debug('Creating Sequelize instance', configuration.db)
  const sequelize: Sequelize = new Sequelize(configuration.db)

  const indexer: { [key: string]: any } = Models
  const models: any[] = Object.keys(Models)
    .filter((key: string) => indexer[key].sync)
    .map((key: string) => indexer[key])

  sequelize.addModels(models)
  return sequelize
}

export const down = async (): Promise<void> => {
  const [migrations, seeders] = await Migrator()
  await seeders.down()
  await migrations.down()
}

export const pending = async (): Promise<Umzug.Migration[]> => {
  const [migrations, seeders] = await Migrator()
  const pendingMigrations: Umzug.Migration[] = await migrations.pending()
  return pendingMigrations.concat(await seeders.pending())
}

export const up = async (): Promise<void> => {
  const [migrations, seeders] = await Migrator()
  await migrations.up()
  await seeders.up()
}

export * from './models/index'

import * as path from 'path'
import * as sqlts from 'sequelize-typescript'
import * as Umzug from 'umzug'
import * as Models from './models/index'

import { Configuration, IConfiguration } from './config'
import { Logger } from './logging'

const init = (config?: IConfiguration): Promise<any> => {
  if (config) {
    return Promise.resolve(new sqlts.Sequelize(config.db))
  }

  return Configuration()
    .then((configuration: IConfiguration) => new sqlts.Sequelize(configuration.db))
}

const umzugs = (sequelize: sqlts.Sequelize): Umzug.Umzug[] => {
  const migrations = new Umzug({
    logging: (...args: any[]): void => Logger.debug('migrations', ...args),
    migrations: {
      params: [
        sequelize.getQueryInterface(),
        sqlts,
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
        sqlts,
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

export const Initialize = (config?: IConfiguration): Promise<Umzug.Umzug[]> => {
  return init(config)
    .then((sequelize: sqlts.Sequelize): Umzug.Umzug[] => {
      const indexer: { [key: string]: any } = Models
      const models: any[] = Object.keys(Models)
        .filter((key: string) => indexer[key].sync)
        .map((key: string) => indexer[key])

      sequelize.addModels(models)
      return umzugs(sequelize)
    })
}

export const down = async (): Promise<void> => {
  const [migrations, seeders] = await Initialize()
  await seeders.down()
  await migrations.down()
}

export const pending = async (): Promise<Umzug.Migration[]> => {
  const [migrations, seeders] = await Initialize()
  const pendingMigrations: Umzug.Migration[] = await migrations.pending()
  return pendingMigrations.concat(await seeders.pending())
}

export const up = async (): Promise<void> => {
  const [migrations, seeders] = await Initialize()
  await migrations.up()
  await seeders.up()
}

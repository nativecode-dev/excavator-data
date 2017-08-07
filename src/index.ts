export * from './models/index'

import * as path from 'path'
import * as sqlts from 'sequelize-typescript'
import * as Umzug from 'umzug'
import * as Models from './models/index'

import { Logger } from './logging'

const migrations = new Umzug({
  logging: (...args): void => Logger.debug('migrations', ...args),
  migrations: {
    params: [
      Models.sequelize.getQueryInterface(),
      sqlts,
    ],
    path: path.join(__dirname, 'migrations'),
    pattern: /\d{14}-\w+-migration\.ts$/,
  },
  storage: 'sequelize',
  storageOptions: {
    sequelize: Models.sequelize,
  },
})

const seeders = new Umzug({
  logging: (...args): void => Logger.debug('seeders', ...args),
  migrations: {
    params: [
      Models.sequelize.getQueryInterface(),
      sqlts,
    ],
    path: path.join(__dirname, 'seeders'),
    pattern: /\d{14}-\w+-seeder\.ts$/,
  },
  storage: 'sequelize',
  storageOptions: {
    sequelize: Models.sequelize,
  },
})

const command: string = process.argv.length > 2 ? process.argv[2].trim() : 'up'
Logger.debug('cli', command)

const Bluebird = Models.sequelize.Promise

switch (command) {
  case 'down':
    seeders.down().then(() => migrations.down())
    break

  case 'pending':
    Bluebird.all([migrations.pending(), seeders.pending()])
      .spread((...values: Umzug.Migration[]) => Logger.debug('pending', ...values))
    break

  case 'up':
    migrations.up().then(() => seeders.up())
    break
}

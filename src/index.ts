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

const command: string = process.argv.length > 1 ? process.argv[1].trim() : 'up'

switch (command) {
  case 'down':
    migrations.down().then(() => seeders.down())
    break

  case 'up':
    migrations.up().then(() => seeders.up())
    break
}

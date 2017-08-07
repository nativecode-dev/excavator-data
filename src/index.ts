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

export const down = async (): Promise<void> => {
  await seeders.down()
  await migrations.down()
}

export const pending = async (): Promise<Umzug.Migration[]> => {
  const pendingMigrations: Umzug.Migration[] = await migrations.pending()
  return pendingMigrations.concat(await seeders.pending())
}

export const up = async (): Promise<void> => {
  await migrations.up()
  await seeders.up()
}

const command: string = process.argv.length > 2 ? process.argv[2].trim() : 'default'

switch (command) {
  case 'down':
    down()
    break

  case 'pending':
    pending()
      .then((pendings: Umzug.Migration[]) => pendings
        .map((m: Umzug.Migration) => m.file)
        .map((file: string) => Logger.debug('pending', file))
      )
    break

  case 'up':
    up()
    break
}

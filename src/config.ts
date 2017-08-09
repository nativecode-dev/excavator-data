import * as bluebird from 'bluebird'
import * as fs from 'fs'
import * as path from 'path'
import * as sqlts from 'sequelize-typescript'

import { ISequelizeConfig } from 'sequelize-typescript'

export type IDbConfiguration = ISequelizeConfig

export interface IConfiguration {
  db: IDbConfiguration
}

export interface IConfigurationEnv {
  [key: string]: IConfiguration
}

export const DefaultConfigFile: string = 'excavator.json'

const exists = (filename: string) => new Promise((resolve, reject): void =>
  fs.exists(filename, (exist: boolean) => resolve(exist))
)

const stringy = (value: string | undefined, defaults: string): string =>
  value === undefined ? defaults : value

const stringray = (value: string | undefined, defaults: string[]): string[] =>
  value === undefined ? defaults : value.split(',')

const env: string = stringy(process.env.EXCAVATOR_ENV, 'development')
const envignore: string[] = stringray(process.env.EXCAVATOR_ENV_IGNORE, ['dev', 'development', 'local'])
const readFile = bluebird.promisify(fs.readFile)

const ConfigSearch = async (cwd: string): Promise<IConfiguration> => {
  // First, let's look inside the provided path.
  const cwdpath: string = path.join(cwd, DefaultConfigFile)
  if (await exists(cwdpath)) {
    try {
      const buffer: Buffer = await readFile(cwdpath)
      const configurations: IConfigurationEnv = JSON.parse(buffer.toString())

      if (configurations[env]) {
        return configurations[env]
      }
    } catch (error) {
      // If we're in production and this happens, we need to make
      // sure we throw an error.
      if (envignore.every((e: string) => e !== env.toLowerCase())) {
        throw error
      }
    }
  }

  // Finally, we'll use environment variables or defaults.
  return {
    db: {
      dialect: stringy(process.env.EXCAVATOR_DB_DIALECT, 'sqlite'),
      host: stringy(process.env.EXCAVATOR_DB_HOST, 'localhost'),
      name: stringy(process.env.EXCAVATOR_DB_NAME, 'excavator'),
      password: stringy(process.env.EXCAVATOR_DB_PASSWORD, ''),
      storage: stringy(process.env.EXCAVATOR_DB_STORAGE, ':memory:'),
      username: stringy(process.env.EXCAVATOR_DB_USERNAME, 'root'),
    }
  }
}

export const Configuration = async (cwd?: string): Promise<IConfiguration> =>
  await ConfigSearch(cwd || process.cwd())

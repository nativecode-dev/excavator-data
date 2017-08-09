import * as bluebird from 'bluebird'
import * as fs from 'fs'
import * as path from 'path'
import * as sqlts from 'sequelize-typescript'

import { ISequelizeConfig } from 'sequelize-typescript'
import { Lincoln, Logger } from './logging'

export type IDbConfiguration = ISequelizeConfig

export interface IConfiguration {
  db: IDbConfiguration
}

export interface IConfigurationEnv {
  [key: string]: IConfiguration
}

export const DefaultConfigFile: string = 'excavator.json'

const log: Lincoln = Logger.extend('config')

const exists = (filename: string) => new Promise((resolve, reject): void =>
  fs.exists(filename, (exist: boolean) => resolve(exist))
)

const stringy = (value: string | undefined, defaults: string): string =>
  value === undefined ? defaults : value

const stringray = (value: string | undefined, defaults: string[]): string[] =>
  value === undefined ? defaults : value.split(',')

const ConfigSearch = async (cwd: string, env: any): Promise<IConfiguration> => {
  const envname: string = stringy(env.EXCAVATOR_ENV, 'development')
  const envignore: string[] = stringray(env.EXCAVATOR_ENV_IGNORE, ['dev', 'development', 'local'])
  const readFile = bluebird.promisify(fs.readFile)

  // First, let's look inside the provided path.
  const cwdpath: string = path.join(cwd, DefaultConfigFile)
  log.debug(`Searching for config using ${cwdpath}...`)

  if (await exists(cwdpath)) {
    try {
      log.debug(`Found config using ${cwdpath}`)
      const buffer: Buffer = await readFile(cwdpath)
      const configurations: IConfigurationEnv = JSON.parse(buffer.toString())
      const config: IConfiguration = configurations[envname]

      if (config) {
        log.debug(`Using environment ${envname}`, config)
        return config
      }
    } catch (error) {
      log.error(error)
      // If we're in production and this happens, we need to make
      // sure we throw an error.
      if (envignore.every((e: string) => e !== envname.toLowerCase())) {
        throw error
      }
    }
  }

  // Finally, we'll use environment variables or defaults.
  return {
    db: {
      dialect: stringy(env.EXCAVATOR_DB_DIALECT, 'sqlite'),
      host: stringy(env.EXCAVATOR_DB_HOST, 'localhost'),
      name: stringy(env.EXCAVATOR_DB_NAME, 'excavator'),
      password: stringy(env.EXCAVATOR_DB_PASSWORD, ''),
      storage: stringy(env.EXCAVATOR_DB_STORAGE, ':memory:'),
      username: stringy(env.EXCAVATOR_DB_USERNAME, 'root'),
    }
  }
}

export const GetConfig = async (cwd?: string, env?: any): Promise<IConfiguration> =>
  await ConfigSearch(cwd || process.cwd(), env || process.env)

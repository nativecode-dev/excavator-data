import 'mocha'

import * as path from 'path'

import { expect } from 'chai'
import { Sequelize } from 'sequelize-typescript'
import { GetConfig, GetRepository, IConfiguration } from '../src/index'

describe('when using sequelize-typescript loader', () => {
  describe('loading configuration', () => {
    it('should get default, in-memory database configuration', async () => {
      const config: IConfiguration = await GetConfig()
      expect(config.db.name).to.equal('excavator')
    })

    it('should use config.json file', async () => {
      const cwd: string = path.resolve(process.cwd(), 'tests/artifacts')
      const config: IConfiguration = await GetConfig(cwd)
      expect(config.db.name).to.equal('excavator-config')
    })

    it('should use environment variables', async () => {
      const env: any = {
        EXCAVATOR_DB_DIALECT: 'sqlite',
        EXCAVATOR_DB_NAME: 'excavator-env',
        EXCAVATOR_DB_PASSWORD: '',
        EXCAVATOR_DB_STORAGE: ':memory:',
        EXCAVATOR_DB_USERNAME: 'root',
      }
      const config: IConfiguration = await GetConfig(undefined, env)
      expect(config.db.name).to.equal(env.EXCAVATOR_DB_NAME)
    })

  })

  describe('connecting to in-memory sqlite database', () => {

    it('should open connection', async () => {
      const config: IConfiguration = await GetConfig()
      const sequelize: Sequelize = await GetRepository(config)
      expect(sequelize.sync).to.be.instanceOf(Function)
    })

  })
})

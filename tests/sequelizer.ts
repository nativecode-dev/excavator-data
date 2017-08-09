import 'mocha'

import * as path from 'path'

import { expect } from 'chai'
import { Sequelize } from 'sequelize-typescript'
import { Configuration, IConfiguration, Repository } from '../src/index'

describe('when using sequelize-typescript loader', () => {
  describe('loading configuration', () => {
    it('should get default, in-memory database configuration', async () => {
      const config: IConfiguration = await Configuration()
      expect(config.db.name).to.equal('excavator')
    })

    it('should use config.json file', async () => {
      const cwd: string = path.resolve(process.cwd(), 'tests/artifacts')
      const config: IConfiguration = await Configuration(cwd)
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
      const config: IConfiguration = await Configuration(undefined, env)
      expect(config.db.name).to.equal(env.EXCAVATOR_DB_NAME)
    })

  })

  describe('connecting to in-memory sqlite database', () => {

    it('should open connection', async () => {
      const config: IConfiguration = await Configuration()
      const sequelize: Sequelize = await Repository(config)
      expect(sequelize.sync).to.be.instanceOf(Function)
    })

  })
})

import 'mocha'

import { expect } from 'chai'
import { Sequelize } from 'sequelize-typescript'
import { GetConfig, GetRepository, IConfiguration, MigrateDown, MigrateList, MigrateUp } from '../src/index'

interface TestContext {
  config: IConfiguration
  repository: Sequelize
}

const context: Partial<TestContext> = {}

describe('when migrating a database', () => {

  beforeEach(async () => {
    context.config = await GetConfig()
    context.repository = await GetRepository(context.config)
  })

  it('should migrate from empty database', async () => {
    if (context.repository) {
      const schemas: any = await context.repository.showAllSchemas({})
      expect(schemas.length).to.be.equal(0)

      await MigrateUp(context.repository)

      const schemasAfter: any = await context.repository.showAllSchemas({})
      expect(schemasAfter.length).to.be.greaterThan(0)
    }
  })

  it('should list pending migrations', async () => {
    if (context.repository) {
      const schemas: any = await context.repository.showAllSchemas({})
      expect(schemas.length).to.be.equal(0)

      const pending = await MigrateList(context.repository)
      expect(pending.length).to.be.greaterThan(0)
    }
  })

})

import 'mocha'

import { expect } from 'chai'
import { Sequelize } from 'sequelize-typescript'
import { Configuration, IConfiguration, Repository } from '../src/index'

describe('when using sequelize-typescript loader', () => {
  describe('connecting to in-memory sqlite database', () => {

    it('should open connection', (done) => {
      Configuration()
        .then((config: IConfiguration): Promise<Sequelize> => Repository(config))
        .then((sequelize: Sequelize) => {
          expect(sequelize.sync).to.be.instanceOf(Function)
          done()
        })
        .catch((error: Error) => done(error))
    })

  })
})

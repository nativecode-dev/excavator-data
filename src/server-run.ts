import { Sequelize } from 'sequelize-typescript'
import { GetConfig, GetRepository, IConfiguration } from './index'
import { ExcavatorDataServer } from './server'

const initialize = async (): Promise<void> => {
  const configuration: IConfiguration = await GetConfig()
  const repository: Sequelize = await GetRepository(configuration)
  await new ExcavatorDataServer().start(repository)
}

initialize()

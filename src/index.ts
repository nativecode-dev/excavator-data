export * from './models/index'

import * as fs from 'fs'
import * as models from './models/index'

export const ExcavatorDataInit = (): Promise<void> => {
  return Promise.resolve(models.sequelize.sync())
}

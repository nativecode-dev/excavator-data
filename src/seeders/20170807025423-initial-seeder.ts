import * as Models from '../models/index'

import { QueryInterface, Sequelize } from 'sequelize'

export const down = async (query: QueryInterface, sql: Sequelize): Promise<void> => {
  Models.Definition.findById(1, { include: [Models.DefinitionValue] })
    .then((definition: Models.Definition) => definition.destroy())
}

export const up = async (query: QueryInterface, sql: Sequelize): Promise<void> => {
  const definition: Models.Definition = new Models.Definition({
    description: 'Standard Search Query',
    id: 1,
    name: 'standard-query',
  })

  const values = [
    new Models.DefinitionValue({
      description: 'Search Box',
      name: 'standard-search-box',
      semantic: 'search-input',
    }),
    new Models.DefinitionValue({
      description: 'Search Submit',
      name: 'standard-search-submit',
      semantic: 'search-submit',
    }),
  ]

  await definition.save()
    .then(() => {
      const models = values.map((value: Models.DefinitionValue) => {
        value.definitionId = definition.id
        return value.save()
      })

      return Promise.all(models)
    })
}

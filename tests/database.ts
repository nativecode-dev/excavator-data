import 'mocha'

import { expect } from 'chai'
import { IFindOptions, Sequelize } from 'sequelize-typescript'
import { Definition, DefinitionValue, GetConfig, GetRepository, IConfiguration } from '../src/index'

interface TestContext {
  config: IConfiguration
  repository: Sequelize
}

const context: Partial<TestContext> = {}

describe('when using database entities', () => {

  const CreateDefinition = (): Definition => {
    return new Definition({
      name: 'test-definition'
    })
  }

  const CreateDefinitionValues = (definition: Definition): DefinitionValue[] => {
    return [
      new DefinitionValue({
        definitionId: definition.id,
        name: 'test-definition-value-1'
      }),
      new DefinitionValue({
        definitionId: definition.id,
        name: 'test-definition-value-2'
      }),
    ]
  }

  const Populate = async (): Promise<Definition> => {
    const definition: Definition = CreateDefinition()
    await definition.save()

    const definitionValues: DefinitionValue[] = CreateDefinitionValues(definition)
    await Promise.all(definitionValues.map((value: DefinitionValue) => value.save()))

    return definition
  }

  beforeEach(async () => {
    context.config = await GetConfig()
    context.repository = await GetRepository(context.config)
    await context.repository.sync()
  })

  it('should insert one-to-many entities', async (): Promise<any> => {
    const definition: Definition = await Populate()
    expect(definition.id).to.equal(1)
  })

  describe('with one-to-many relationships', () => {

    const options: IFindOptions = {
      include: [DefinitionValue],
    }

    beforeEach(async () => {
      await Populate()
    })

    it('should load entities', async () => {
      const definition: Definition | null = await Definition.findById<Definition>(1, options)

      if (definition) {
        expect(definition.values.length).to.equal(2)
      }
      expect(definition).not.equal(null)
    })

    it('should load parent', async () => {
      const definitionValues: DefinitionValue[] | null = await DefinitionValue.all<DefinitionValue>({
        include: [Definition],
        where: {
          definitionId: 1
        }
      })

      if (definitionValues) {
        definitionValues.map((value: DefinitionValue) => expect(value.definition.id).to.equal(1))
      }
    })

  })
})

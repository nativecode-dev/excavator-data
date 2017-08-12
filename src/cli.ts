import * as inquirer from 'inquirer'
import * as umzug from 'umzug'

import { Sequelize } from 'sequelize-typescript'
import { GetConfig, GetRepository, IConfiguration, MigrateDown, MigrateList, MigrateUp } from './index'
import { Logger } from './logging'
import { ExcavatorDataServer } from './server'

enum CliCommandType {
  server = 'server',
  migrate = 'migrate',
}

enum CliMigrateAction {
  createMigration = 'create:migration',
  createModel = 'create:model',
  createSeeder = 'create:seeder',
  down = 'down',
  pending = 'pending',
  up = 'up',
}

interface CliPrompts {
  [key: string]: inquirer.Question
}

const prompts: CliPrompts = {
  $: {
    choices: [
      CliCommandType.migrate,
      CliCommandType.server,
    ],
    message: 'Select a command...',
    name: 'command',
    type: 'list',
  },
  migrate: {
    choices: [
      CliMigrateAction.up,
      CliMigrateAction.down,
      CliMigrateAction.pending,
      CliMigrateAction.createMigration,
      CliMigrateAction.createModel,
      CliMigrateAction.createSeeder,
    ],
    message: 'Select a migration action...',
    name: 'migration',
    type: 'list',
  }
}

const lib: any = {
  migrate: {
    down: (): Promise<any> => MigrateDown(),
    pending: (): Promise<any> => MigrateList().then((pendings: umzug.Migration[]) => pendings
      .map((m: umzug.Migration) => m.file)
      .map((file: string) => Logger.debug('pending', file))
    ),
    up: (): Promise<any> => MigrateUp(),
  },
}

inquirer.prompt([prompts.$])
  .then(async (answers: inquirer.Answers): Promise<any> => {
    if (answers.command === CliCommandType.migrate) {
      const action: inquirer.Answers = await inquirer.prompt([prompts.migrate])
      const actionHandler = lib[answers.command][action.migration]
      return actionHandler()
    } else if (answers.command === CliCommandType.server) {
      const config: IConfiguration = await GetConfig()
      const repository: Sequelize = await GetRepository(config)
      const server: ExcavatorDataServer = new ExcavatorDataServer()
      await server.start(repository)
    }
  })

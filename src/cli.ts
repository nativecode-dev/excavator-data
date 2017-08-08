import * as inquirer from 'inquirer'
import * as umzug from 'umzug'

import { down, pending, up } from './index'
import { Logger } from './logging'

enum CliCommandType {
  migrate = 'migrate',
  createMigration = 'create:migration',
  createModel = 'create:model',
  createSeeder = 'create:seeder',
}

enum CliMigrateAction {
  down = 'down',
  pending = 'pending',
  up = 'up',
}

const prompts: { [key: string]: inquirer.Question } = {
  $: {
    choices: [
      CliCommandType.migrate,
      CliCommandType.createMigration,
      CliCommandType.createModel,
      CliCommandType.createSeeder,
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
    ],
    message: 'Select a migration action...',
    name: 'migration',
    type: 'list',
  }
}

const lib: any = {
  migrate: {
    down: (): Promise<any> => down(),
    pending: (): Promise<any> => pending().then((pendings: umzug.Migration[]) => pendings
      .map((m: umzug.Migration) => m.file)
      .map((file: string) => Logger.debug('pending', file))
    ),
    up: (): Promise<any> => up(),
  },
}

inquirer.prompt([prompts.$])
  .then(async (answers: inquirer.Answers): Promise<any> => {
    if (answers.command === CliCommandType.migrate) {
      const action: inquirer.Answers = await inquirer.prompt([prompts.migrate])
      const actionHandler = lib[answers.command][action.migration]
      return actionHandler()
    }
  })

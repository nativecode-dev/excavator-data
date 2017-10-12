import * as sqlts from 'sequelize-typescript'

import { Column, CreatedAt, DeletedAt, Table, UpdatedAt } from 'sequelize-typescript'
import { Lincoln, Logger } from '../logging'
import { IModel } from './interfaces'

export abstract class Model<T> extends sqlts.Model<T> implements IModel {
  @CreatedAt
  @Column
  public created: Date

  @UpdatedAt
  @Column
  public modified: Date

  protected readonly log: Lincoln

  constructor(values?: any, options?: sqlts.IBuildOptions) {
    super(values, options)
    this.log = Logger.extend(this.typename())
    this.log.debug('constructor', values, options)
  }

  protected abstract typename(): string
}

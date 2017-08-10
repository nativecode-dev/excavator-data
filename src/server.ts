import * as events from 'events'
import * as http from 'http'

import { Chain, ChainHandlers } from '@nofrills/smorgasbord'
import { Sequelize } from 'sequelize-typescript'
import { Lincoln, Logger } from './logging'
import { DefaultHandlers } from './server-handlers'

export interface RequestWrapper {
  api: http.IncomingMessage
  sequelize: Sequelize
  server: http.Server
}

export interface ResponseWrapper {
  api: http.ServerResponse
}

export interface IServerConfiguration {
  handlers: ChainHandlers<RequestWrapper, ResponseWrapper>
  host: string
  port: number
}

const DefaultConfig: IServerConfiguration = {
  handlers: DefaultHandlers,
  host: 'localhost',
  port: 9001,
}

export class ExcavatorDataServer {
  private readonly chains: Chain<RequestWrapper, ResponseWrapper>
  private readonly config: IServerConfiguration
  private readonly log: Lincoln
  private readonly server: http.Server

  private promise: Promise<void>
  private sequelize: Sequelize

  constructor(config?: Partial<IServerConfiguration>) {
    this.config = { ...config, ...DefaultConfig }
    this.chains = new Chain<RequestWrapper, ResponseWrapper>(this.config.handlers)
    this.log = Logger.extend('server')
    this.server = http.createServer(
      (request: http.IncomingMessage, response: http.ServerResponse): void => {
        const req: RequestWrapper = { api: request, sequelize: this.sequelize, server: this.server }
        const res: ResponseWrapper = { api: response }
        this.chains.execute(req, true, (): ResponseWrapper => res)
      }
    )
  }

  public start(sequelize: Sequelize): Promise<void> {
    if (this.promise === undefined && this.sequelize === undefined) {
      this.log.debug('starting server', this.config)

      this.sequelize = sequelize

      this.promise = new Promise<void>((resolve, reject) => {
        this.server.on('close', () => resolve())
        this.server.on('error', (error: Error) => reject(error))
        this.server.listen(this.config.port, this.config.host)
      })

      return this.promise.catch((error: Error): void => this.log.error(error))
    }
    return this.promise ? this.promise : Promise.resolve()
  }

  public stop(): Promise<http.Server> {
    if (this.promise) {
      return this.promise.then((): http.Server => {
        this.server.close()
        return this.server
      })
    }
    return Promise.resolve(this.server)
  }
}

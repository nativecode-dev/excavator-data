import * as events from 'events'
import * as http from 'http'

import { Chain, ChainHandlers } from '@nofrills/smorgasbord'
import { Sequelize } from 'sequelize-typescript'
import { Lincoln, Logger } from './logging'
import { DefaultHandlers } from './server-handlers'

/**
 * Represents the context for a request.
 * @export
 * @interface Request
 */
export interface Request {
  api: http.IncomingMessage
  sequelize: Sequelize
  server: http.Server
}

/**
 * Represents the context for a response.
 * @export
 * @interface Response
 */
export interface Response {
  api: http.ServerResponse
}

/**
 * Configuration options for the server.
 * @export
 * @interface IServerConfiguration
 */
export interface IServerConfiguration {
  handlers: ChainHandlers<Request, Response>
  host: string
  port: number
}

const DefaultConfig: IServerConfiguration = {
  handlers: DefaultHandlers,
  host: 'localhost',
  port: 9001,
}

/**
 * A default API server that can be used to quickly update the database
 * via REST calls. It is recommended that you use another package, such
 * as ExpressJS. However, that shouldn't preclude you from using this in
 * production, because it's just a basic node http server.
 * @export
 * @class ExcavatorDataServer
 */
export class ExcavatorDataServer {
  private readonly chains: Chain<Request, Response>
  private readonly config: IServerConfiguration
  private readonly log: Lincoln
  private readonly server: http.Server

  private promise: Promise<void>
  private sequelize: Sequelize

  constructor(config?: Partial<IServerConfiguration>) {
    this.config = { ...config, ...DefaultConfig }
    this.chains = new Chain<Request, Response>(this.config.handlers)
    this.log = Logger.extend('server')
    this.server = http.createServer(
      (request: http.IncomingMessage, response: http.ServerResponse): void => {
        const req: Request = { api: request, sequelize: this.sequelize, server: this.server }
        const res: Response = { api: response }
        this.chains.execute(req, true, (): Response => res)
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

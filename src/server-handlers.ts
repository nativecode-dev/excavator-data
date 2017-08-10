import * as http from 'http'
import * as url from 'url'
import * as Models from './models/index'

import { ChainHandlerLink, ChainHandlers } from '@nofrills/smorgasbord'
import { Lincoln, Logger } from './logging'
import { Model } from './models/Model'
import { RequestWrapper, ResponseWrapper } from './server'

export type Handlers = ChainHandlers<RequestWrapper, ResponseWrapper>
export type ResponseHandler = ChainHandlerLink<RequestWrapper, ResponseWrapper>

interface Dictionary<T> {
  [key: string]: T
}

export const DefaultHandlers: Handlers = [
  // Logging handler
  (request: RequestWrapper, next: ResponseHandler): ResponseWrapper => {
    Logger.debug(request.api.url)
    return next(request)
  },

  // Killer handler
  (request: RequestWrapper, next: ResponseHandler): ResponseWrapper => {
    if (request.api.url === '/killme') {
      process.exit(0)
    }
    return next(request)
  },

  // Routing handler
  (request: RequestWrapper, next: ResponseHandler): ResponseWrapper => {
    if (request.api.url) {
      const uri: url.Url = url.parse(request.api.url)
      if (uri.pathname) {
        const parts: string[] = uri.pathname.slice(1).split('/')
        Logger.debug(parts)
        if (parts.length) {
          const key: string = parts[0]
          const dictionary: Dictionary<any> = Models
          const model: Model<{}> = dictionary[key]
        }
      }
    }

    const response: ResponseWrapper = next(request)
    if (response) {
      response.api.statusCode = 200
    }
    return response
  },

  // Terminating handler
  (request: RequestWrapper, next: ResponseHandler): ResponseWrapper => {
    Logger.debug('terminating')
    const response: ResponseWrapper = next(request)
    response.api.end()
    Logger.debug('terminated')
    return response
  },
]

/** 
 * @module @nativecode/excavator-cli/lib/server
 */

/**
 * A default API server that can be used to quickly update the database
 * via REST calls. It is recommended that you use another package, such
 * as ExpressJS. However, that shouldn't preclude you from using this in
 * production, because it's just a basic node http server.
 * @export
 * @class
 */
export class ExcavatorDataServer {
  /**
   * @param {Sequelize} sequelize
   * @function module:@nativecode/excavator-cli/lib/server.ExcavatorDataServer#start
   * @returns {Promise<void>}
   */
  start() {}

  /**
   * @function module:@nativecode/excavator-cli/lib/server.ExcavatorDataServer#stop
   * @returns {Promise<module:http.Server>}
   */
  stop() {}
}

/**
 * Configuration options for the server.
 * @interface module:@nativecode/excavator-cli/lib/server.IServerConfiguration
 * @property {Array<module:/Users/mpham/Code/opensource/excavator-data/node_modules/@nofrills/smorgasbord/lib/Patterns/Chains.__type>} handlers
 * @property {string} host
 * @property {number} port
 * @export
 * @interface IServerConfiguration
 */
export class IServerConfiguration {
}

/**
 * Represents the context for a request.
 * @interface module:@nativecode/excavator-cli/lib/server.Request
 * @property {module:http.IncomingMessage} api
 * @property {Sequelize} sequelize
 * @property {module:http.Server} server
 * @export
 * @interface Request
 */
export class Request {
}

/**
 * Represents the context for a response.
 * @interface module:@nativecode/excavator-cli/lib/server.Response
 * @property {module:http.ServerResponse} api
 * @export
 * @interface Response
 */
export class Response {
}


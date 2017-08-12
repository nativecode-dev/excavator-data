/** 
 * @module @nativecode/excavator-cli/lib/models/DefinitionValue
 */

/**
 * * Represents what the value is mapped to, which can
 * * either be an action or act as input.
 * * @export
 * * @enum {number}
 * @enum {number}
 * @property Action
 * @property Input
 */
export var DefinitionValueType
/**
 * A value attached to a definition that defines the semantic
 * meaning of a field name or id.
 * @extends module:@nativecode/excavator-cli/lib/models/Model.Model
 * @property {module:@nativecode/excavator-cli/lib/models/Definition.Definition} definition
 * @property {number} definitionId
 * @property {string} description
 * @property {string} name
 * @property {string} semantic
 * @property {module:@nativecode/excavator-cli/lib/models/DefinitionValue.DefinitionValueType} type
 * @export
 * @class
 * @extends
 */
export class DefinitionValue {
  /**
   * @protected
   * @function module:@nativecode/excavator-cli/lib/models/DefinitionValue.DefinitionValue#typename
   * @returns {string}
   */
  typename() {}
}


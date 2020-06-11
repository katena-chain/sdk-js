/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const { createModelSchema, primitive, alias, raw } = require('serializr')

/**
 * UnknownTxData is useful to deserialize and serialize back a tx data of unknown type.
 */
class UnknownTxData {

  /**
   * UnknownTxData constructor.
   * @param type {string}
   * @param value {Object}
   */
  constructor(type, value) {
    this._type = type
    this._value = value
  }

  /**
   * @returns {string}
   */
  getType() {
    return this._type
  }

  /**
   * @returns {Object}
   */
  getValue() {
    return this._value
  }

}

createModelSchema(UnknownTxData, {
  _value: alias('value', raw()),
  _type: alias('type', primitive()),
})

module.exports = {
  UnknownTxData: UnknownTxData,
}
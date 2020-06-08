/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const { byteSchema } = require('../serializer/serializer')
const { createModelSchema, custom, primitive, deserialize, serialize, alias } = require('serializr')
const { getAvailableTypes } = require('./common/common')

/**
 * Tx wraps a tx data with its signature information and a nonce time to avoid replay attacks.
 */
class Tx {

  /**
   * Tx constructor.
   * @param nonceTime {string}
   * @param data {Object}
   * @param signerFqId {string}
   * @param signature {Buffer}
   */
  constructor(nonceTime, data, signerFqId, signature) {
    this._nonceTime = nonceTime
    this._data = data
    this._signerFqId = signerFqId
    this._signature = signature
  }

  /**
   * @returns {string}
   */
  getNonceTime() {
    return this._nonceTime
  }

  /**
   * @returns {Object}
   */
  getData() {
    return this._data
  }

  /**
   * @returns {string}
   */
  getSignerFqId() {
    return this._signerFqId
  }

  /**
   * @returns {Buffer}
   */
  getSignature() {
    return this._signature
  }

}

createModelSchema(Tx, {
  _data: alias('data', custom(
    function (v) {
      return { type: v.getType(), value: serialize(v) }
    },
    function (v) {
      if (v.type in getAvailableTypes()) {
        return deserialize(getAvailableTypes()[v.type], v.value)
      }
      return v
    },
  )),
  _nonceTime: alias('nonce_time', primitive()),
  _signature: alias('signature', byteSchema()),
  _signerFqId: alias('signer_fqid', primitive()),
})

module.exports = {
  Tx: Tx,
}
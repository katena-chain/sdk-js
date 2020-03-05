/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const { PublicKeyEd25519 } = require('../crypto/Ed25519/publicKeyEd25519')
const { publicKeySchema, byteSchema } = require('../serializer/serializer')
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
   * @param signer {PublicKeyEd25519}
   * @param signature {Buffer}
   */
  constructor(nonceTime, data, signer, signature) {
    this._nonceTime = nonceTime
    this._data = data
    this._signer = signer
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
   * @returns {PublicKeyEd25519}
   */
  getSigner() {
    return this._signer
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
  _signer: alias('signer', publicKeySchema(PublicKeyEd25519)),
})

module.exports = {
  Tx: Tx,
}
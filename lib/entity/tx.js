/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const { PublicKey } = require('../crypto/Ed25519/publicKey')
const { publicKeySchema, byteSchema } = require('../serializer/serializer')
const { createModelSchema, custom, primitive, deserialize, serialize, alias } = require('serializr')
const { getAvailableTypes } = require('./certify/types')

/**
 * Tx wraps a tx data with its signature information and a nonce time to avoid replay attacks.
 */
class Tx {

  /**
   * Tx constructor.
   * @param nonceTime {string}
   * @param data {Object}
   * @param signer {PublicKeyED25519}
   * @param signature {Buffer}
   */
  constructor(nonceTime, data, signer, signature) {
    this._nonceTime = nonceTime
    this._data = data
    this._signer = signer
    this._signature = signature
  }

  /**
   * nonceTime getter.
   * @return {string}
   */
  getNonceTime() {
    return this._nonceTime
  }

  /**
   * data getter.
   * @return {Object}
   */
  getData() {
    return this._data
  }

  /**
   * signer getter.
   * @return {PublicKeyED25519}
   */
  getSigner() {
    return this._signer
  }

  /**
   * signature getter.
   * @return {Buffer[]}
   */
  getSignature() {
    return this._signature
  }

}

// Create model schemas
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
    }
  )),
  _nonceTime: alias('nonce_time', primitive()),
  _signature: alias('signature', byteSchema()),
  _signer: alias('signer', publicKeySchema(PublicKey))
})

module.exports = {
  Tx: Tx,
}
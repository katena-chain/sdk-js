/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

`use strict`

const { PublicKeyX25519 } = require('../../crypto/Nacl/publicKeyX25519')
const { getTypeSecretNaclBoxV1 } = require('./certify')
const { createModelSchema, primitive, alias } = require('serializr')
const { byteSchema, publicKeySchema } = require('../../serializer/serializer')

/**
 * SecretNaclBoxV1 is the first version of a nacl box secret.
 */
class SecretNaclBoxV1 {

  /**
   * SecretNaclBoxV1 constructor.
   * @param id {string}
   * @param sender (PublicKeyX25519)
   * @param nonce {Buffer}
   * @param content {Buffer}
   */
  constructor(id, sender, nonce, content) {
    this._id = id
    this._sender = sender
    this._nonce = nonce
    this._content = content
  }

  /**
   * @returns {string}
   */
  getId() {
    return this._id
  }

  /**
   * @returns {PublicKeyX25519}
   */
  getSender() {
    return this._sender
  }

  /**
   * @returns {Buffer}
   */
  getNonce() {
    return this._nonce
  }

  /**
   * @returns {Buffer}
   */
  getContent() {
    return this._content
  }

  /**
   * @returns {string}
   */
  getType() {
    return getTypeSecretNaclBoxV1()
  }
}

createModelSchema(SecretNaclBoxV1, {
  _content: alias('content', byteSchema()),
  _id: alias('id', primitive()),
  _nonce: alias('nonce', byteSchema()),
  _sender: alias('sender', publicKeySchema(PublicKeyX25519)),
})

module.exports = {
  SecretNaclBoxV1: SecretNaclBoxV1,
}
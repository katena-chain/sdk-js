/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

`use strict`

const { PublicKeyX25519 } = require('../../crypto/Nacl/publicKeyX25519')
const { getSecretNaclBoxV1Type, getSecretIdKey, NAMESPACE } = require('./certify')
const { createModelSchema, primitive, alias } = require('serializr')
const { bytesPropSchema } = require('../../serializer/bytes')
const { abstractKeyPropSchema } = require('../../serializer/crypto')
const { concatFqId } = require('../../utils/common')

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
    return getSecretNaclBoxV1Type()
  }

  /**
   * @param signerCompanyBcId
   * @returns {{}}
   */
  getStateIds(signerCompanyBcId) {
    return {
      [getSecretIdKey()]: concatFqId(signerCompanyBcId, this.getId()),
    }
  }

  /**
   * @returns {string}
   */
  getNamespace() {
    return NAMESPACE
  }
}

createModelSchema(SecretNaclBoxV1, {
  _content: alias('content', bytesPropSchema()),
  _id: alias('id', primitive()),
  _nonce: alias('nonce', bytesPropSchema()),
  _sender: alias('sender', abstractKeyPropSchema(PublicKeyX25519)),
})

module.exports = {
  SecretNaclBoxV1: SecretNaclBoxV1,
}
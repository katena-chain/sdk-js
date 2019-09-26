/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const { getTypeCertificateEd25519V1 } = require('./certify')
const { PublicKey } = require('../../crypto/Ed25519/publicKey')
const { createModelSchema, primitive, alias } = require('serializr')
const { publicKeySchema, byteSchema } = require('../../serializer/serializer')

/**
 * CertificateEd25519V1 is the first version of an ed25519 certificate.
 */
class CertificateEd25519V1 {

  /**
   * CertificateEd25519V1 constructor.
   * @param id (string)
   * @param signer (PublicKey)
   * @param signature {Buffer}
   */
  constructor(id, signer, signature) {
    this._id = id
    this._signer = signer
    this._signature = signature
  }

  /**
   * id getter.
   * @return {string}
   */
  getId() {
    return this._id
  }

  /**
   * signer getter.
   * @return {PublicKey}
   */
  getSigner() {
    return this._signer
  }

  /**
   * signature getter.
   * @return {Buffer}
   */
  getSignature() {
    return this._signature
  }

  /**
   * type getter
   * @returns {string}
   */
  getType() {
    return getTypeCertificateEd25519V1()
  }
}

createModelSchema(CertificateEd25519V1, {
  _id: alias('id', primitive()),
  _signature: alias('signature', byteSchema()),
  _signer: alias('signer', publicKeySchema(PublicKey))
})

module.exports = {
  CertificateEd25519V1: CertificateEd25519V1,
}
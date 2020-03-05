/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const { getTypeCertificateEd25519V1 } = require('./certify')
const { PublicKeyEd25519 } = require('../../crypto/Ed25519/publicKeyEd25519')
const { publicKeySchema, byteSchema } = require('../../serializer/serializer')
const { getTypeCertificateRawV1 } = require('./certify')
const { createModelSchema, primitive, alias } = require('serializr')

/**
 * CertificateRawV1 is the first version of a raw certificate.
 */
class CertificateRawV1 {

  /**
   * CertificateRawV1 constructor.
   * @param id {string}
   * @param value {Buffer}
   */
  constructor(id, value) {
    this._id = id
    this._value = value
  }

  /**
   * @returns {string}
   */
  getId() {
    return this._id
  }

  /**
   * @returns {Buffer}
   */
  getValue() {
    return this._value
  }

  /**
   * @returns {string}
   */
  getType() {
    return getTypeCertificateRawV1()
  }

}

createModelSchema(CertificateRawV1, {
  _id: alias('id', primitive()),
  _value: alias('value', byteSchema()),
})

/**
 * CertificateEd25519V1 is the first version of an ed25519 certificate.
 */
class CertificateEd25519V1 {

  /**
   * CertificateEd25519V1 constructor.
   * @param id {string}
   * @param signer {PublicKeyEd25519}
   * @param signature {Buffer}
   */
  constructor(id, signer, signature) {
    this._id = id
    this._signer = signer
    this._signature = signature
  }

  /**
   * @returns {string}
   */
  getId() {
    return this._id
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

  /**
   * @returns {string}
   */
  getType() {
    return getTypeCertificateEd25519V1()
  }
}

createModelSchema(CertificateEd25519V1, {
  _id: alias('id', primitive()),
  _signature: alias('signature', byteSchema()),
  _signer: alias('signer', publicKeySchema(PublicKeyEd25519)),
})

module.exports = {
  CertificateEd25519V1: CertificateEd25519V1,
  CertificateRawV1: CertificateRawV1,
}
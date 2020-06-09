/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const { getCertificateEd25519V1Type } = require('./certify')
const { PublicKeyEd25519 } = require('../../crypto/Ed25519/publicKeyEd25519')
const { bytesPropSchema } = require('../../serializer/bytes')
const { abstractKeyPropSchema } = require('../../serializer/crypto')
const { getCertificateRawV1Type, getCertificateIdKey, NAMESPACE } = require('./certify')
const { createModelSchema, primitive, alias } = require('serializr')
const { concatFqId } = require('../../utils/common')

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
    return getCertificateRawV1Type()
  }

  /**
   * @param signerCompanyBcId
   * @returns {{}}
   */
  getStateIds(signerCompanyBcId) {
    return {
      [getCertificateIdKey()]: concatFqId(signerCompanyBcId, this.getId()),
    }
  }

  /**
   * @returns {string}
   */
  getNamespace() {
    return NAMESPACE
  }
}

createModelSchema(CertificateRawV1, {
  _id: alias('id', primitive()),
  _value: alias('value', bytesPropSchema()),
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
    return getCertificateEd25519V1Type()
  }

  /**
   * @param signerCompanyBcId
   * @returns {{}}
   */
  getStateIds(signerCompanyBcId) {
    return {
      [getCertificateIdKey()]: concatFqId(signerCompanyBcId, this.getId()),
    }
  }

  /**
   * @returns {string}
   */
  getNamespace() {
    return NAMESPACE
  }
}

createModelSchema(CertificateEd25519V1, {
  _id: alias('id', primitive()),
  _signature: alias('signature', bytesPropSchema()),
  _signer: alias('signer', abstractKeyPropSchema(PublicKeyEd25519)),
})

module.exports = {
  CertificateEd25519V1: CertificateEd25519V1,
  CertificateRawV1: CertificateRawV1,
}
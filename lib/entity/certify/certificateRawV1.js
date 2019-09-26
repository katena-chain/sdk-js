/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const { getTypeCertificateRawV1 } = require('./certify')
const { createModelSchema, primitive, custom, alias } = require('serializr')
const { byteSchema } = require('../../serializer/serializer')

/**
 * CertificateRawV1 is the first version of a raw certificate.
 */
class CertificateRawV1 {

  /**
   * CertificateRawV1 constructor.
   * @param id (string)
   * @param value {Buffer}
   */
  constructor(id, value) {
    this._id = id
    this._value = value
  }

  /**
   * id getter.
   * @return {string}
   */
  getId() {
    return this._id
  }

  /**
   * value getter.
   * @return {uitn8[]}
   */
  getValue() {
    return this._value
  }

  /**
   * type getter
   * @returns {string}
   */
  getType() {
    return getTypeCertificateRawV1()
  }

}

createModelSchema(CertificateRawV1, {
  _id: alias('id', primitive()),
  _value: alias('value', byteSchema())
})

module.exports = {
  CertificateRawV1: CertificateRawV1,
}
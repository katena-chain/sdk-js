/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const { getCertificateRawV1Type, getCertificateEd25519V1Type, getSecretNaclBoxV1Type } = require('../entity/certify/certify')
const { CertificateEd25519V1, CertificateRawV1 } = require('../entity/certify/certificate')
const { SecretNaclBoxV1 } = require('../entity/certify/secret')
const { getKeyCreateV1Type, getKeyRevokeV1Type, getKeyRotateV1Type } = require('../entity/account/account')
const { KeyCreateV1, KeyRevokeV1, KeyRotateV1 } = require('../entity/account/key')
const { UnknownTxData } = require('../entity/unknownTxData')
const { serialize, deserialize } = require('serializr')

/**
 * return the available tx data types.
 * @returns {Object}
 */
function getAvailableTypes() {
  return {
    [getCertificateRawV1Type()]: CertificateRawV1.prototype,
    [getCertificateEd25519V1Type()]: CertificateEd25519V1.prototype,
    [getSecretNaclBoxV1Type()]: SecretNaclBoxV1.prototype,
    [getKeyCreateV1Type()]: KeyCreateV1.prototype,
    [getKeyRotateV1Type()]: KeyRotateV1.prototype,
    [getKeyRevokeV1Type()]: KeyRevokeV1.prototype,
  }
}

/**
 * returns a schema to serialize/deserialize a TxData field.
 * @returns {Object}
 */
function txDataPropSchema() {
  return {
    serializer: function (v) {
      return serializeTxData(v)
    },
    deserializer: function (v, done) {
      return done(null, deserializeTxData(v))
    },
  }
}

/**
 * accepts a TxData object and tries to serialize its value according to its type.
 * @param v {Object}
 * @returns {Object}
 */
function serializeTxData(v) {
  let value = serialize(v)
  if (v instanceof UnknownTxData) {
    return value
  }
  return { type: v.getType(), value }
}

/**
 * accepts a wrapper and tries to deserialize its value according to its string type.
 * @param v {Object}
 * @returns {Object}
 */
function deserializeTxData(v) {
  if (v.type in getAvailableTypes()) {
    return deserialize(getAvailableTypes()[v.type], v.value)
  }
  return deserialize(UnknownTxData, v)
}

module.exports = {
  txDataPropSchema,
  deserializeTxData,
  serializeTxData,
}
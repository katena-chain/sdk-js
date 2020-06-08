/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const { getCertificateRawV1Type, getCertificateEd25519V1Type, getSecretNaclBoxV1Type } = require('../certify/certify')
const { CertificateEd25519V1, CertificateRawV1 } = require('../certify/certificate')
const { SecretNaclBoxV1 } = require('../certify/secret')
const { getKeyCreateV1Type, getKeyRevokeV1Type, getKeyRotateV1Type } = require('../account/account')
const { KeyCreateV1, KeyRevokeV1, KeyRotateV1 } = require('../account/key')

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

module.exports = {
  getAvailableTypes,
}
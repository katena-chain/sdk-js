/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const { getTypeCertificateRawV1, getTypeCertificateEd25519V1, getTypeSecretNaclBoxV1 } = require('../certify/certify')
const { CertificateEd25519V1, CertificateRawV1 } = require('../certify/certificate')
const { SecretNaclBoxV1 } = require('../certify/secret')
const { getTypeKeyCreateV1, getTypeKeyRevokeV1 } = require('../account/account')
const { KeyCreateV1, KeyRevokeV1 } = require('../account/key')

/**
 * return the available tx data types.
 * @returns {Object}
 */
function getAvailableTypes() {
  return {
    [getTypeCertificateRawV1()]: CertificateRawV1.prototype,
    [getTypeCertificateEd25519V1()]: CertificateEd25519V1.prototype,
    [getTypeSecretNaclBoxV1()]: SecretNaclBoxV1.prototype,
    [getTypeKeyCreateV1()]: KeyCreateV1.prototype,
    [getTypeKeyRevokeV1()]: KeyRevokeV1.prototype,
  }
}

module.exports = {
  getAvailableTypes,
}
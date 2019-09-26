/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const { getTypeCertificateRawV1, getTypeCertificateEd25519V1, getTypeSecretNaclBoxV1 } = require('./certify')
const { CertificateEd25519V1 } = require('./certificateEd25519V1')
const { SecretNaclBoxV1 } = require('./secretNaclBoxV1')
const { CertificateRawV1 } = require('./certificateRawV1')

function getAvailableTypes() {
  return {
    [getTypeCertificateRawV1()]: CertificateRawV1.prototype,
    [getTypeCertificateEd25519V1()]: CertificateEd25519V1.prototype,
    [getTypeSecretNaclBoxV1()]: SecretNaclBoxV1.prototype,
  }
}

module.exports = { getAvailableTypes }
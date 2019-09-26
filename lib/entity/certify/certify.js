/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const { sprintf } = require('../../utils/string')

const NAMESPACE_CERTIFY = 'certify'
const TYPE_CERTIFICATE = 'certificate'
const TYPE_SECRET = 'secret'
const TYPE_RAW = 'raw'
const TYPE_ED25519 = 'ed25519'
const TYPE_NACL_BOX = 'nacl_box'

function getNamespaceCertify() {
  return NAMESPACE_CERTIFY
}

function getCertificateSubNamespace() {
  return sprintf('%s.%s', getNamespaceCertify(), TYPE_CERTIFICATE)
}

function getSecretSubNamespace() {
  return sprintf('%s.%s', getNamespaceCertify(), TYPE_SECRET)
}

function getTypeCertificateEd25519V1() {
  return sprintf('%s.%s.%s', getCertificateSubNamespace(), TYPE_ED25519, 'v1')
}

function getTypeCertificateRawV1() {
  return sprintf('%s.%s.%s', getCertificateSubNamespace(), TYPE_RAW, 'v1')
}

function getTypeSecretNaclBoxV1() {
  return sprintf('%s.%s.%s', getSecretSubNamespace(), TYPE_NACL_BOX, 'v1')
}


module.exports = {
  getNamespaceCertify,
  getCertificateSubNamespace,
  getTypeCertificateEd25519V1,
  getTypeCertificateRawV1,
  getTypeSecretNaclBoxV1
}
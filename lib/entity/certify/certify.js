/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const { sprintf } = require('../../utils/string')

const NAMESPACE = 'certify'
const TYPE_CERTIFICATE = 'certificate'
const TYPE_SECRET = 'secret'
const TYPE_RAW = 'raw'
const TYPE_ED25519 = 'ed25519'
const TYPE_NACL_BOX = 'nacl_box'

/**
 * @returns {string}
 */
function getCertificateIdKey() {
  return sprintf('%s.%s', NAMESPACE, TYPE_CERTIFICATE)
}

/**
 * @returns {string}
 */
function getSecretIdKey() {
  return sprintf('%s.%s', NAMESPACE, TYPE_SECRET)
}

/**
 * @returns {string}
 */
function getCertificateEd25519V1Type() {
  return sprintf('%s.%s.%s', getCertificateIdKey(), TYPE_ED25519, 'v1')
}

/**
 * @returns {string}
 */
function getCertificateRawV1Type() {
  return sprintf('%s.%s.%s', getCertificateIdKey(), TYPE_RAW, 'v1')
}

/**
 * @returns {string}
 */
function getSecretNaclBoxV1Type() {
  return sprintf('%s.%s.%s', getSecretIdKey(), TYPE_NACL_BOX, 'v1')
}


module.exports = {
  getCertificateIdKey,
  getSecretIdKey,
  getCertificateEd25519V1Type,
  getCertificateRawV1Type,
  getSecretNaclBoxV1Type,
  NAMESPACE,
}
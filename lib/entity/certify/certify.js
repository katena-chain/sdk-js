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
const TYPE_Ed25519 = 'ed25519'
const TYPE_NACL_BOX = 'nacl_box'

/**
 * returns the certificate category.
 * @returns {string}
 */
function getCategoryCertificate() {
  return sprintf('%s.%s', NAMESPACE, TYPE_CERTIFICATE)
}

/**
 * returns the secret category.
 * @returns {string}
 */
function getCategorySecret() {
  return sprintf('%s.%s', NAMESPACE, TYPE_SECRET)
}

/**
 * returns the certificate ed25519 v1 type.
 * @returns {string}
 */
function getTypeCertificateEd25519V1() {
  return sprintf('%s.%s.%s', getCategoryCertificate(), TYPE_Ed25519, 'v1')
}

/**
 * returns the certificate raw v1 type.
 * @returns {string}
 */
function getTypeCertificateRawV1() {
  return sprintf('%s.%s.%s', getCategoryCertificate(), TYPE_RAW, 'v1')
}

/**
 * returns the secret nacl box v1 type.
 * @returns {string}
 */
function getTypeSecretNaclBoxV1() {
  return sprintf('%s.%s.%s', getCategorySecret(), TYPE_NACL_BOX, 'v1')
}


module.exports = {
  getCategoryCertificate,
  getCategorySecret,
  getTypeCertificateEd25519V1,
  getTypeCertificateRawV1,
  getTypeSecretNaclBoxV1,
}
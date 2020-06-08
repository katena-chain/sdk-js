/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const { sprintf } = require('../../utils/string')

const NAMESPACE = 'account'
const TYPE_KEY = 'key'
const DEFAULT_ROLE_ID = 'default'
const COMPANY_ADMIN_ROLE_ID = 'company_admin'
const TYPE_CREATE = 'create'
const TYPE_REVOKE = 'revoke'
const TYPE_ROTATE = 'rotate'

/**
 * @returns {string}
 */
function getKeyIdKey() {
  return sprintf('%s.%s', NAMESPACE, TYPE_KEY)
}

/**
 * @returns {string}
 */
function getKeyCreateV1Type() {
  return sprintf('%s.%s.%s', getKeyIdKey(), TYPE_CREATE, 'v1')
}

/**
 * @returns {string}
 */
function getKeyRotateV1Type() {
  return sprintf('%s.%s.%s', getKeyIdKey(), TYPE_ROTATE, 'v1')
}

/**
 * @returns {string}
 */
function getKeyRevokeV1Type() {
  return sprintf('%s.%s.%s', getKeyIdKey(), TYPE_REVOKE, 'v1')
}

module.exports = {
  getKeyIdKey,
  getKeyCreateV1Type,
  getKeyRotateV1Type,
  getKeyRevokeV1Type,
  DEFAULT_ROLE_ID,
  COMPANY_ADMIN_ROLE_ID,
  NAMESPACE,
}
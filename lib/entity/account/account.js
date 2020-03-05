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

/**
 * returns the key create category.
 * @returns {string}
 */
function getCategoryKeyCreate() {
  return sprintf('%s.%s.%s', NAMESPACE, TYPE_KEY, TYPE_CREATE)
}

/**
 * returns the key revoke category.
 * @returns {string}
 */
function getCategoryKeyRevoke() {
  return sprintf('%s.%s.%s', NAMESPACE, TYPE_KEY, TYPE_REVOKE)
}

/**
 * returns the key create v1 type.
 * @returns {string}
 */
function getTypeKeyCreateV1() {
  return sprintf('%s.%s', getCategoryKeyCreate(), 'v1')
}

/**
 * returns the key revoke v1 type.
 * @returns {string}
 */
function getTypeKeyRevokeV1() {
  return sprintf('%s.%s', getCategoryKeyRevoke(), 'v1')
}

module.exports = {
  getCategoryKeyCreate,
  getCategoryKeyRevoke,
  getTypeKeyCreateV1,
  getTypeKeyRevokeV1,
  DEFAULT_ROLE_ID,
  COMPANY_ADMIN_ROLE_ID,
}
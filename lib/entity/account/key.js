/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const { getTypeKeyCreateV1, getTypeKeyRevokeV1 } = require('./account')
const { PublicKeyEd25519 } = require('../../crypto/Ed25519/publicKeyEd25519')
const { publicKeySchema } = require('../../serializer/serializer')
const { createModelSchema, primitive, alias } = require('serializr')

/**
 * KeyV1 is the first version of a key.
 */
class KeyV1 {

  /**
   * KeyV1 constructor.
   * @param companyBcid {string}
   * @param publicKey {PublicKeyEd25519}
   * @param isActive {boolean}
   * @param role {string}
   */
  constructor(companyBcid, publicKey, isActive, role) {
    this._companyBcid = companyBcid
    this._publicKey = publicKey
    this._isActive = isActive
    this._role = role
  }

  /**
   * @returns {string}
   */
  getCompanyBcid() {
    return this._companyBcid
  }

  /**
   * @returns {PublicKeyEd25519}
   */
  getPublicKey() {
    return this._publicKey
  }

  /**
   * @returns {boolean}
   */
  getIsActive() {
    return this._isActive
  }

  /**
   * @returns {string}
   */
  getRole() {
    return this._role
  }
}

createModelSchema(KeyV1, {
  _companyBcid: alias('company_bcid', primitive()),
  _publicKey: alias('public_key', publicKeySchema(PublicKeyEd25519)),
  _isActive: alias('is_active', primitive()),
  _role: alias('role', primitive()),
})

/**
 * KeyCreateV1 is the first version of a key create message.
 */
class KeyCreateV1 {

  /**
   * KeyCreateV1 constructor.
   * @param id {string}
   * @param publicKey {PublicKeyEd25519}
   * @param role {string}
   */
  constructor(id, publicKey, role) {
    this._id = id
    this._publicKey = publicKey
    this._role = role
  }

  /**
   * @returns {string}
   */
  getId() {
    return this._id
  }

  /**
   * @returns {PublicKeyEd25519}
   */
  getPublicKey() {
    return this._publicKey
  }

  /**
   * @returns {string}
   */
  getRole() {
    return this._role
  }

  /**
   * @returns {string}
   */
  getType() {
    return getTypeKeyCreateV1()
  }
}

createModelSchema(KeyCreateV1, {
  _id: alias('id', primitive()),
  _publicKey: alias('public_key', publicKeySchema(PublicKeyEd25519)),
  _role: alias('role', primitive()),
})

/**
 * KeyRevokeV1 is the first version of an ed25519 certificate.
 */
class KeyRevokeV1 {

  /**
   * KeyRevokeV1 constructor.
   * @param id {string}
   * @param publicKey {PublicKeyEd25519}
   */
  constructor(id, publicKey) {
    this._id = id
    this._publicKey = publicKey
  }

  /**
   * @returns {string}
   */
  getId() {
    return this._id
  }

  /**
   * @returns {PublicKeyEd25519}
   */
  getPublicKey() {
    return this._publicKey
  }

  /**
   * @returns {string}
   */
  getType() {
    return getTypeKeyRevokeV1()
  }
}

createModelSchema(KeyRevokeV1, {
  _id: alias('id', primitive()),
  _publicKey: alias('public_key', publicKeySchema(PublicKeyEd25519)),
})

module.exports = {
  KeyV1,
  KeyCreateV1,
  KeyRevokeV1,
}
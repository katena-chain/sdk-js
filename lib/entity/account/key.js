/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const { getKeyCreateV1Type, getKeyRevokeV1Type, getKeyRotateV1Type, getKeyIdKey, NAMESPACE } = require('./account')
const { PublicKeyEd25519 } = require('../../crypto/Ed25519/publicKeyEd25519')
const { publicKeySchema } = require('../../serializer/serializer')
const { createModelSchema, primitive, alias } = require('serializr')
const { concatFqId } = require('../../utils/common')

/**
 * KeyV1 is the first version of a key.
 */
class KeyV1 {

  /**
   * KeyV1 constructor.
   * @param fqId {string}
   * @param publicKey {PublicKeyEd25519}
   * @param isActive {boolean}
   * @param role {string}
   */
  constructor(fqId, publicKey, isActive, role) {
    this._fqId = fqId
    this._publicKey = publicKey
    this._isActive = isActive
    this._role = role
  }

  /**
   * @returns {string}
   */
  getFqId() {
    return this._fqId
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
  _fqId: alias('fqid', primitive()),
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
    return getKeyCreateV1Type()
  }

  /**
   * @param signerCompanyBcId
   * @returns {{}}
   */
  getStateIds(signerCompanyBcId) {
    return {
      [getKeyIdKey()]: concatFqId(signerCompanyBcId, this.getId()),
    }
  }

  /**
   * @returns {string}
   */
  getNamespace() {
    return NAMESPACE
  }
}

createModelSchema(KeyCreateV1, {
  _id: alias('id', primitive()),
  _publicKey: alias('public_key', publicKeySchema(PublicKeyEd25519)),
  _role: alias('role', primitive()),
})

/**
 * KeyRotateV1 is the first version of a key rotate message.
 */
class KeyRotateV1 {

  /**
   * KeyRotateV1 constructor.
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
    return getKeyRotateV1Type()
  }

  /**
   * @param signerCompanyBcId
   * @returns {{}}
   */
  getStateIds(signerCompanyBcId) {
    return {
      [getKeyIdKey()]: concatFqId(signerCompanyBcId, this.getId()),
    }
  }

  /**
   * @returns {string}
   */
  getNamespace() {
    return NAMESPACE
  }
}

createModelSchema(KeyRotateV1, {
  _id: alias('id', primitive()),
  _publicKey: alias('public_key', publicKeySchema(PublicKeyEd25519)),
})

/**
 * KeyRevokeV1 is the first version of a key revoke message.
 */
class KeyRevokeV1 {

  /**
   * KeyRevokeV1 constructor.
   * @param id {string}
   */
  constructor(id) {
    this._id = id
  }

  /**
   * @returns {string}
   */
  getId() {
    return this._id
  }

  /**
   * @returns {string}
   */
  getType() {
    return getKeyRevokeV1Type()
  }

  /**
   * @param signerCompanyBcId
   * @returns {{}}
   */
  getStateIds(signerCompanyBcId) {
    return {
      [getKeyIdKey()]: concatFqId(signerCompanyBcId, this.getId()),
    }
  }

  /**
   * @returns {string}
   */
  getNamespace() {
    return NAMESPACE
  }
}

createModelSchema(KeyRevokeV1, {
  _id: alias('id', primitive()),
})

module.exports = {
  KeyV1,
  KeyCreateV1,
  KeyRotateV1,
  KeyRevokeV1,
}
/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const { CertificateRawV1, CertificateEd25519V1 } = require('./entity/certify/certificate')
const { SecretNaclBoxV1 } = require('./entity/certify/secret')
const { KeyCreateV1, KeyRevokeV1 } = require('./entity/account/key')
const { getCategoryKeyCreate, getCategoryKeyRevoke } = require('./entity/account/account')
const { Handler } = require('./api/handler')
const { formatTxid, getCurrentTime } = require('./utils/common')

/**
 * Transactor provides helper function to hide the complexity of Tx creation, signature and API dialog.
 */
class Transactor {

  /**
   * Transactor constructor
   * @param apiUrl {string}
   * @param chainID {string}
   * @param companyBcid {string}
   * @param txSigner {PrivateKeyEd25519}
   */
  constructor(apiUrl, companyBcid = '', chainID = '', txSigner = null) {
    this._apiHandler = new Handler(apiUrl)
    this._chainID = chainID
    this._txSigner = txSigner
    this._companyBcid = companyBcid
  }

  /**
   * creates a CertificateRaw (V1) and sends it to the API.
   * @param uuid {string}
   * @param value {Buffer}
   * @returns {Promise<TxStatus>}
   */
  sendCertificateRawV1(uuid, value) {
    let certificate = new CertificateRawV1(formatTxid(this._companyBcid, uuid), value)
    return this.sendTx(certificate)
  }

  /**
   * creates a CertificateEd25519 (V1) and sends it to the API.
   * @param uuid {string}
   * @param signature {Buffer}
   * @param signer {PublicKeyEd25519}
   * @returns {Promise<TxStatus>}
   */
  sendCertificateEd25519V1(uuid, signer, signature) {
    let certificate = new CertificateEd25519V1(formatTxid(this._companyBcid, uuid), signer, signature)
    return this.sendTx(certificate)
  }

  /**
   * creates a KeyCreate (V1) and sends it to the API.
   * @param uuid {string}
   * @param publicKey {PublicKeyEd25519}
   * @param role {string}
   * @returns {Promise<TxStatus>}
   */
  sendKeyCreateV1(uuid, publicKey, role) {
    let keyCreate = new KeyCreateV1(formatTxid(this._companyBcid, uuid), publicKey, role)
    return this.sendTx(keyCreate)
  }

  /**
   * creates a KeyRevoke (V1) and sends it to the API.
   * @param uuid {string}
   * @param publicKey {PublicKeyEd25519}
   * @returns {Promise<TxStatus>}
   */
  sendKeyRevokeV1(uuid, publicKey) {
    let keyRevoke = new KeyRevokeV1(formatTxid(this._companyBcid, uuid), publicKey)
    return this.sendTx(keyRevoke)
  }

  /**
   * creates a SecretNaclBox (V1) and sends it to the API.
   * @param uuid {string}
   * @param sender {PublicKeyX25519}
   * @param nonce {Buffer}
   * @param content {Buffer}
   * @returns {Promise<TxStatus>}
   */
  sendSecretNaclBoxV1(uuid, sender, nonce, content) {
    let secret = new SecretNaclBoxV1(formatTxid(this._companyBcid, uuid), sender, nonce, content)
    return this.sendTx(secret)
  }

  /**
   * signs and sends a tx to the Api.
   * @param txData {Object}
   * @returns {Promise<TxStatus>}
   */
  sendTx(txData) {
    const tx = this._apiHandler.signTx(this._txSigner, this._chainID, getCurrentTime(), txData)
    return this._apiHandler.sendTx(tx)
  }

  /**
   * fetches the API and returns a tx wrapper.
   * @param companyBcid {string}
   * @param uuid {string}
   * @returns {Promise<TxWrapper>}
   */
  retrieveLastCertificate(companyBcid, uuid) {
    return this._apiHandler.retrieveLastCertificate(formatTxid(companyBcid, uuid))
  }

  /**
   * fetches the API and returns a tx wrapper list.
   * @param companyBcid {string}
   * @param uuid {string}
   * @param page {int}
   * @param txPerPage {int}
   * @returns {Promise<TxWrappers>}
   */
  retrieveCertificates(companyBcid, uuid, page, txPerPage) {
    return this._apiHandler.retrieveCertificates(formatTxid(companyBcid, uuid), page, txPerPage)
  }

  /**
   * fetches the API and returns a tx wrapper list.
   * @param companyBcid {string}
   * @param uuid {string}
   * @param page {int}
   * @param txPerPage {int}
   * @returns {Promise<TxWrappers>}
   */
  retrieveKeyCreateTxs(companyBcid, uuid, page, txPerPage) {
    return this._apiHandler.retrieveTxs(getCategoryKeyCreate(), formatTxid(companyBcid, uuid), page, txPerPage)
  }

  /**
   * fetches the API and returns a tx wrapper list.
   * @param companyBcid {string}
   * @param uuid {string}
   * @param page {int}
   * @param txPerPage {int}
   * @returns {Promise<TxWrappers>}
   */
  retrieveKeyRevokeTxs(companyBcid, uuid, page, txPerPage) {
    return this._apiHandler.retrieveTxs(getCategoryKeyRevoke(), formatTxid(companyBcid, uuid), page, txPerPage)
  }

  /**
   * fetches the API and returns the list of keyV1 for a company.
   * @param companyBcid {string}
   * @param page {int}
   * @param txPerPage {int}
   * @returns {Promise<KeyV1[]>}
   */
  retrieveCompanyKeys(companyBcid, page, txPerPage) {
    return this._apiHandler.retrieveCompanyKeys(companyBcid, page, txPerPage)
  }

  /**
   * fetches the API and returns a tx wrapper list.
   * @param companyBcid {string}
   * @param uuid {string}
   * @param page {int}
   * @param txPerPage {int}
   * @returns {Promise<TxWrappers>}
   */
  retrieveSecrets(companyBcid, uuid, page, txPerPage) {
    return this._apiHandler.retrieveSecrets(formatTxid(companyBcid, uuid), page, txPerPage)
  }

  /**
   * fetches the API and returns a tx wrapper list.
   * @param txCategory {string}
   * @param companyBcid {string}
   * @param uuid {string}
   * @param page {int}
   * @param txPerPage {int}
   * @returns {Promise<TxWrappers>}
   */
  retrieveTxs(txCategory, companyBcid, uuid, page, txPerPage) {
    return this._apiHandler.retrieveTxs(txCategory, formatTxid(companyBcid, uuid), page, txPerPage)
  }
}

module.exports = {
  Transactor,
}
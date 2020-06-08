/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const { CertificateRawV1, CertificateEd25519V1 } = require('./entity/certify/certificate')
const { SecretNaclBoxV1 } = require('./entity/certify/secret')
const { KeyCreateV1, KeyRevokeV1, KeyRotateV1 } = require('./entity/account/key')
const { Handler } = require('./api/handler')
const { concatFqId, getCurrentTime } = require('./utils/common')

/**
 * Transactor provides helper function to hide the complexity of Tx creation, signature and API dialog.
 */
class Transactor {

  /**
   * Transactor constructor
   * @param apiUrl {string}
   * @param chainID {string}
   * @param txSigner {TxSigner}
   */
  constructor(apiUrl, chainID = '', txSigner = null) {
    this._apiHandler = new Handler(apiUrl)
    this._chainID = chainID
    this._txSigner = txSigner
  }

  /**
   * creates a CertificateRaw (V1) and sends it to the API.
   * @param id {string}
   * @param value {Buffer}
   * @returns {Promise<SendTxResult>}
   */
  sendCertificateRawV1Tx(id, value) {
    let certificate = new CertificateRawV1(id, value)
    return this.sendTx(certificate)
  }

  /**
   * creates a CertificateEd25519 (V1) and sends it to the API.
   * @param id {string}
   * @param signature {Buffer}
   * @param signer {PublicKeyEd25519}
   * @returns {Promise<SendTxResult>}
   */
  sendCertificateEd25519V1Tx(id, signer, signature) {
    let certificate = new CertificateEd25519V1(id, signer, signature)
    return this.sendTx(certificate)
  }

  /**
   * creates a SecretNaclBox (V1) and sends it to the API.
   * @param id {string}
   * @param sender {PublicKeyX25519}
   * @param nonce {Buffer}
   * @param content {Buffer}
   * @returns {Promise<SendTxResult>}
   */
  sendSecretNaclBoxV1Tx(id, sender, nonce, content) {
    let secret = new SecretNaclBoxV1(id, sender, nonce, content)
    return this.sendTx(secret)
  }

  /**
   * creates a KeyCreate (V1) and sends it to the API.
   * @param id {string}
   * @param publicKey {PublicKeyEd25519}
   * @param role {string}
   * @returns {Promise<SendTxResult>}
   */
  sendKeyCreateV1Tx(id, publicKey, role) {
    let keyCreate = new KeyCreateV1(id, publicKey, role)
    return this.sendTx(keyCreate)
  }

  /**
   * creates a KeyRotate (V1) and sends it to the API.
   * @param id {string}
   * @param publicKey {PublicKeyEd25519}
   * @returns {Promise<SendTxResult>}
   */
  sendKeyRotateV1Tx(id, publicKey) {
    let keyRotate = new KeyRotateV1(id, publicKey)
    return this.sendTx(keyRotate)
  }

  /**
   * creates a KeyRevoke (V1) and sends it to the API.
   * @param id {string}
   * @returns {Promise<SendTxResult>}
   */
  sendKeyRevokeV1Tx(id) {
    let keyRevoke = new KeyRevokeV1(id)
    return this.sendTx(keyRevoke)
  }

  /**
   * creates a tx from a tx data and the provided tx signer info and chain id, signs it, encodes it and sends it
   * to the api.
   * @param txData {Object}
   * @returns {Promise<SendTxResult>}
   */
  sendTx(txData) {
    const tx = this._apiHandler.signTx(this._txSigner, this._chainID, getCurrentTime(), txData)
    return this._apiHandler.sendTx(tx)
  }

  /**
   * fetches the API and returns the last tx related to a certificate fqid.
   * @param companyBcId {string}
   * @param id {string}
   * @returns {Promise<TxResult>}
   */
  retrieveLastCertificateTx(companyBcId, id) {
    return this._apiHandler.retrieveLastCertificateTx(concatFqId(companyBcId, id))
  }

  /**
   * fetches the API and returns all txs related to a certificate fqid.
   * @param companyBcId {string}
   * @param id {string}
   * @param page {int}
   * @param txPerPage {int}
   * @returns {Promise<TxResults>}
   */
  retrieveCertificateTxs(companyBcId, id, page, txPerPage) {
    return this._apiHandler.retrieveCertificateTxs(concatFqId(companyBcId, id), page, txPerPage)
  }

  /**
   * fetches the API and returns the last tx related to a secret fqid.
   * @param companyBcId {string}
   * @param id {string}
   * @returns {Promise<TxResult>}
   */
  retrieveLastSecretTx(companyBcId, id) {
    return this._apiHandler.retrieveLastSecretTx(concatFqId(companyBcId, id))
  }

  /**
   * fetches the API and returns all txs related to a secret fqid.
   * @param companyBcId {string}
   * @param id {string}
   * @param page {int}
   * @param txPerPage {int}
   * @returns {Promise<TxResults>}
   */
  retrieveSecretTxs(companyBcId, id, page, txPerPage) {
    return this._apiHandler.retrieveSecretTxs(concatFqId(companyBcId, id), page, txPerPage)
  }

  /**
   * fetches the API and returns all txs related to a key fqid.
   * @param companyBcId {string}
   * @param id {string}
   * @param page {int}
   * @param txPerPage {int}
   * @returns {Promise<TxResults>}
   */
  retrieveKeyTxs(companyBcId, id, page, txPerPage) {
    return this._apiHandler.retrieveKeyTxs(concatFqId(companyBcId, id), page, txPerPage)
  }

  /**
   * fetches the API and returns the last tx related to a key fqid.
   * @param companyBcId {string}
   * @param id {string}
   * @returns {Promise<TxResult>}
   */
  retrieveLastKeyTx(companyBcId, id) {
    return this._apiHandler.retrieveLastKeyTx(concatFqId(companyBcId, id))
  }

  /**
   * fetches the API and return any tx by its hash.
   * @param hash {string}
   * @returns {Promise<TxResult>}
   */
  retrieveTx(hash) {
    return this._apiHandler.retrieveTx(hash)
  }

  /**
   * fetches the API and returns a key from the state.
   * @param companyBcId {string}
   * @param id {string}
   * @returns {Promise<KeyV1>}
   */
  retrieveKey(companyBcId, id) {
    return this._apiHandler.retrieveKey(concatFqId(companyBcId, id))
  }

  /**
   * fetches the API and returns a list of keys for a company from the state.
   * @param companyBcId {string}
   * @param page {int}
   * @param txPerPage {int}
   * @returns {Promise<KeyV1[]>}
   */
  retrieveCompanyKeys(companyBcId, page, txPerPage) {
    return this._apiHandler.retrieveCompanyKeys(companyBcId, page, txPerPage)
  }
}

module.exports = {
  Transactor,
}
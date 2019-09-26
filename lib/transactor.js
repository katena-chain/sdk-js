/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const { CertificateRawV1 } = require('./entity/certify/certificateRawV1')
const { CertificateEd25519V1 } = require('./entity/certify/certificateEd25519V1')
const { SecretNaclBoxV1 } = require('./entity/certify/secretNaclBoxV1')
const { Handler } = require('./api/handler')
const { Tx } = require('./entity/tx')
const { sprintf } = require('./utils/string')
const moment = require('moment/moment')
const { serialize } = require('serializr')

/**
 * Transactor provides helper function to hide the complexity of Tx creation, signature and API dialog.
 */
class Transactor {


  /**
   * Transactor constructor
   * @param apiUrl {string}
   * @param chainID {string}
   * @param companyChainID {string}
   * @param txSigner {PrivateKeyED25519}
   */
  constructor(apiUrl, companyChainID, chainID = '', txSigner = null) {
    this._apiHandler = new Handler(apiUrl)
    this._chainID = chainID
    this._txSigner = txSigner
    this._companyChainID = companyChainID
    this.FORMAT_ID = '%s-%s'
  }

  /**
   * creates a CertificateRaw (V1), wraps in a tx and sends it to the API.
   * @param uuid {string}
   * @param value {Buffer}
   * @return {Promise<TxStatus>}
   */
  sendCertificateRawV1(uuid, value) {
    let certificate = new CertificateRawV1()
    certificate._id = this.formatBcid(this._companyChainID, uuid)
    certificate._value = value

    const tx = this.getTx(certificate)

    return this._apiHandler.sendCertificate(tx)
  }

  /**
   * creates a CertificateEd25519 (V1), wraps in a tx and sends it to the API.
   * @param uuid {string}
   * @param signature {Buffer}
   * @param signer {Buffer}
   * @return {Promise<TxStatus>}
   */
  sendCertificateEd25519V1(uuid, signer, signature) {
    let certificate = new CertificateEd25519V1()
    certificate._id = this.formatBcid(this._companyChainID, uuid)
    certificate._signer = signer
    certificate._signature = signature

    const tx = this.getTx(certificate)

    return this._apiHandler.sendCertificate(tx)
  }

  /**
   * fetches the API to find the corresponding tx and return a tx wrapper.
   * @param companyChainID {string}
   * @param uuid {string}
   * @return {Promise<TxWrapper>}
   */
  retrieveCertificate(companyChainID, uuid) {
    return this._apiHandler.retrieveCertificate(this.formatBcid(companyChainID, uuid))
  }

  /**
   * fetches the API to find the corresponding txs and returns tx wrappers or an error.
   * @param companyChainID {string}
   * @param uuid {string}
   * @return {Promise<TxWrappers>}
   */
  retrieveCertificatesHistory(companyChainID, uuid) {
    return this._apiHandler.retrieveCertificatesHistory(this.formatBcid(companyChainID, uuid))
  }

  /**
   * creates a SecretNaclBox (V1), wraps in a tx and sends it to the API.
   * @param uuid {string}
   * @param sender {PublicKeyX25519}
   * @param nonce {Buffer}
   * @param content {Buffer}
   *
   * @return {Promise<TxStatus>}
   */
  async sendSecretNaclBoxV1(uuid, sender, nonce, content) {
    let secret = new SecretNaclBoxV1()
    secret._id = this.formatBcid(this._companyChainID, uuid)
    secret._nonce = nonce
    secret._sender = sender
    secret._content = content

    const tx = this.getTx(secret)

    return await this._apiHandler.sendSecret(tx)
  }

  /**
   * fetches the API to find the corresponding txs and returns tx wrappers.
   * @param companyChainId {string}
   * @param uuid {string}
   *
   * @return {Promise<TxWrappers>}
   */
  async retrieveSecrets(companyChainId, uuid) {
    return await this._apiHandler.retrieveSecrets(this.formatBcid(companyChainId, uuid))
  }

  /**
   * signs a tx data and returns a new tx ready to be sent.
   * @param txData {Object}
   * @returns {Tx}
   */
  getTx(txData) {
    const now = moment()
    const nonceTime = now.utc().format('YYYY-MM-DDTHH:mm:ss.SS') + '0000Z'
    const txDataState = this.getTxDataState(this._chainID, nonceTime, txData)
    return new Tx(nonceTime, txData, this._txSigner.getPublicKey(), this._txSigner.sign(txDataState))
  }

  /**
   * returns the sorted and marshaled json representation of a TxData ready to be signed.
   * @param chainId {string}
   * @param nonceTime {string}
   * @param txData {Object}
   *
   * @return Object
   */
  getTxDataState(chainId, nonceTime, txData) {
    return Buffer.from(JSON.stringify({
      chain_id: chainId,
      data: { type: txData.getType(), value: serialize(txData) },
      nonce_time: nonceTime
    }), 'utf8')
  }

  /**
   * concatenates a company chain id and a uuid into a bcid.
   * @param companyChainId {string}
   * @param uuid {string}
   *
   * @return string
   */
  formatBcid(companyChainId, uuid) {
    return sprintf(this.FORMAT_ID, companyChainId, uuid)
  }
}

module.exports = {
  Transactor,
}
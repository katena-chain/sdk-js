/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const { Client } = require('./client')
const { sprintf } = require('../utils/string')
const { getPaginationQueryParams } = require('../utils/common')
const { ApiError } = require('../errors/apiError')
const { TxStatus } = require('../entity/api/txStatus')
const { TxWrapper } = require('../entity/api/txWrapper')
const { TxWrappers } = require('../entity/api/txWrappers')
const { Tx } = require('../entity/tx')
const { KeyV1 } = require('../entity/account/key')
const HttpStatus = require('http-status-codes')
const { serialize, deserialize } = require('serializr')

/**
 * Handler provides helper methods to send and retrieve txs without directly interacting with the HTTP Client.
 */
class Handler {

  /**
   * Handler constructor
   * @param apiUrl {string}
   */
  constructor(apiUrl) {
    this._apiClient = new Client(apiUrl)
  }

  /**
   * accepts a tx and sends it to the Api to return a tx status or throws an error.
   * @param tx {Tx}
   * @returns {Promise<TxStatus>}
   */
  async sendTx(tx) {
    const apiResponse = await this._apiClient.post(Handler.TXS_PATH, JSON.stringify(serialize(tx)))
    if (apiResponse.getStatusCode() === HttpStatus.ACCEPTED) {
      return deserialize(TxStatus, JSON.parse(apiResponse.getBody()))
    } else {
      throw ApiError.fromJSON(apiResponse.getBody())
    }
  }

  /**
   * fetches the API and returns a tx wrapper or throws an error.
   * @param id {string}
   * @returns {Promise<TxWrapper>}
   */
  async retrieveLastCertificate(id) {
    const apiResponse = await this._apiClient.get(sprintf('%s/%s/%s', Handler.CERTIFICATES_PATH, id, Handler.LAST_PATH))
    if (apiResponse.getStatusCode() === HttpStatus.OK) {
      return deserialize(TxWrapper, JSON.parse(apiResponse.getBody()))
    } else {
      throw ApiError.fromJSON(apiResponse.getBody())
    }
  }

  /**
   * fetches the API and returns a tx wrapper list or throws an error.
   * @param id {string}
   * @param page {int}
   * @param txPerPage {int}
   * @returns {Promise<TxWrappers>}
   */
  async retrieveCertificates(id, page, txPerPage) {
    const queryParams = getPaginationQueryParams(page, txPerPage)
    const apiResponse = await this._apiClient.get(sprintf('%s/%s', Handler.CERTIFICATES_PATH, id), queryParams)
    if (apiResponse.getStatusCode() === HttpStatus.OK) {
      return deserialize(TxWrappers, JSON.parse(apiResponse.getBody()))
    } else {
      throw ApiError.fromJSON(apiResponse.getBody())
    }
  }

  /**
   * fetches the API and returns a tx wrapper list or throws an error.
   * @param id {string}
   * @param page {int}
   * @param txPerPage {int}
   * @returns {Promise<TxWrappers>}
   */
  async retrieveSecrets(id, page, txPerPage) {
    const queryParams = getPaginationQueryParams(page, txPerPage)
    const apiResponse = await this._apiClient.get(sprintf('%s/%s', Handler.SECRETS_PATH, id), queryParams)
    if (apiResponse.getStatusCode() === HttpStatus.OK) {
      return deserialize(TxWrappers, JSON.parse(apiResponse.getBody()))
    } else {
      throw ApiError.fromJSON(apiResponse.getBody())
    }
  }

  /**
   * fetches the API and returns a tx wrapper list or throws an error.
   * @param txCategory {string}
   * @param id {string}
   * @param page {int}
   * @param txPerPage {int}
   * @returns {Promise<TxWrappers>}
   */
  async retrieveTxs(txCategory, id, page, txPerPage) {
    const queryParams = getPaginationQueryParams(page, txPerPage)
    const apiResponse = await this._apiClient.get(sprintf('%s/%s/%s', Handler.TXS_PATH, txCategory, id), queryParams)
    if (apiResponse.getStatusCode() === HttpStatus.OK) {
      return deserialize(TxWrappers, JSON.parse(apiResponse.getBody()))
    } else {
      throw ApiError.fromJSON(apiResponse.getBody())
    }
  }

  /**
   * fetches the API and returns the list of keyV1 for a company or throws an error.
   * @param companyBcid {string}
   * @param page {int}
   * @param txPerPage {int}
   * @returns {Promise<KeyV1[]>}
   */
  async retrieveCompanyKeys(companyBcid, page, txPerPage) {
    const queryParams = getPaginationQueryParams(page, txPerPage)
    const apiResponse = await this._apiClient.get(sprintf('%s/%s/%s', Handler.COMPANIES_PATH, companyBcid, Handler.KEYS_PATH), queryParams)
    if (apiResponse.getStatusCode() === HttpStatus.OK) {
      return deserialize(KeyV1, JSON.parse(apiResponse.getBody()))
    } else {
      throw ApiError.fromJSON(apiResponse.getBody())
    }
  }

  /**
   * creates a tx data state, signs it and returns a tx ready to encode and send.
   * @param privateKey {PrivateKeyEd25519}
   * @param chainID {string}
   * @param nonceTime {string}
   * @param txData {Object}
   * @returns {Tx}
   */
  signTx(privateKey, chainID, nonceTime, txData) {
    const txDataState = this.getTxDataState(chainID, nonceTime, txData)
    const signature = privateKey.sign(txDataState)
    return new Tx(nonceTime, txData, privateKey.getPublicKey(), signature)
  }

  /**
   * returns the sorted and marshaled json representation of a TxData ready to be signed.
   * @param chainID {string}
   * @param nonceTime {string}
   * @param txData {Object}
   * @returns {Buffer}
   */
  getTxDataState(chainID, nonceTime, txData) {
    return Buffer.from(JSON.stringify({
      chain_id: chainID,
      data: { type: txData.getType(), value: serialize(txData) },
      nonce_time: nonceTime,
    }), 'utf8')
  }

}

Handler.CERTIFICATES_PATH = 'certificates'
Handler.LAST_PATH = 'last'
Handler.SECRETS_PATH = 'secrets'
Handler.TXS_PATH = 'txs'
Handler.COMPANIES_PATH = 'companies'
Handler.KEYS_PATH = 'keys'

module.exports = {
  Handler,
}
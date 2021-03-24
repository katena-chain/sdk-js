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
const { SendTxResult } = require('../entity/api/sendTxResult')
const { TxResult } = require('../entity/api/txResult')
const { TxResults } = require('../entity/api/txResults')
const { Tx } = require('../entity/tx')
const { KeyV1 } = require('../entity/account/key')
const HttpStatus = require('http-status-codes')
const { serialize, deserialize, createSimpleSchema } = require('serializr')
const { txDataPropSchema, deserializeTxData } = require('../serializer/txData')

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
   * fetches the API to return the last tx related to a certificate fqid.
   * @param fqId {string}
   * @returns {Promise<TxResult>}
   */
  async retrieveLastCertificateTx(fqId) {
    const apiResponse = await this._apiClient.get(sprintf('%s/%s/%s/%s', Handler.TXS_PATH, Handler.CERTIFICATES_PATH, fqId, Handler.LAST_PATH))
    if (apiResponse.getStatusCode() === HttpStatus.OK) {
      return deserialize(TxResult, JSON.parse(apiResponse.getBody()))
    } else {
      throw ApiError.fromJSON(apiResponse.getBody())
    }
  }

  /**
   * fetches the API to return all txs related to a certificate fqid.
   * @param fqId {string}
   * @param page {int}
   * @param txPerPage {int}
   * @returns {Promise<TxResults>}
   */
  async retrieveCertificateTxs(fqId, page, txPerPage) {
    const apiResponse = await this._apiClient.get(sprintf('%s/%s/%s', Handler.TXS_PATH, Handler.CERTIFICATES_PATH, fqId), getPaginationQueryParams(page, txPerPage))
    if (apiResponse.getStatusCode() === HttpStatus.OK) {
      return deserialize(TxResults, JSON.parse(apiResponse.getBody()))
    } else {
      throw ApiError.fromJSON(apiResponse.getBody())
    }
  }

  /**
   * fetches the API to return the last tx related to a secret fqid.
   * @param fqId {string}
   * @returns {Promise<TxResult>}
   */
  async retrieveLastSecretTx(fqId) {
    const apiResponse = await this._apiClient.get(sprintf('%s/%s/%s/%s', Handler.TXS_PATH, Handler.SECRETS_PATH, fqId, Handler.LAST_PATH))
    if (apiResponse.getStatusCode() === HttpStatus.OK) {
      return deserialize(TxResult, JSON.parse(apiResponse.getBody()))
    } else {
      throw ApiError.fromJSON(apiResponse.getBody())
    }
  }

  /**
   * fetches the API to return all txs related to a secret fqid.
   * @param fqId {string}
   * @param page {int}
   * @param txPerPage {int}
   * @returns {Promise<TxResults>}
   */
  async retrieveSecretTxs(fqId, page, txPerPage) {
    const apiResponse = await this._apiClient.get(sprintf('%s/%s/%s', Handler.TXS_PATH, Handler.SECRETS_PATH, fqId), getPaginationQueryParams(page, txPerPage))
    if (apiResponse.getStatusCode() === HttpStatus.OK) {
      return deserialize(TxResults, JSON.parse(apiResponse.getBody()))
    } else {
      throw ApiError.fromJSON(apiResponse.getBody())
    }
  }

  /**
   * fetches the API to return the last tx related to a key fqid.
   * @param fqId {string}
   * @returns {Promise<TxResult>}
   */
  async retrieveLastKeyTx(fqId) {
    const apiResponse = await this._apiClient.get(sprintf('%s/%s/%s/%s', Handler.TXS_PATH, Handler.KEYS_PATH, fqId, Handler.LAST_PATH))
    if (apiResponse.getStatusCode() === HttpStatus.OK) {
      return deserialize(TxResult, JSON.parse(apiResponse.getBody()))
    } else {
      throw ApiError.fromJSON(apiResponse.getBody())
    }
  }

  /**
   * fetches the API to return all txs related to a key fqid.
   * @param fqId {string}
   * @param page {int}
   * @param txPerPage {int}
   * @returns {Promise<TxResults>}
   */
  async retrieveKeyTxs(fqId, page, txPerPage) {
    const apiResponse = await this._apiClient.get(sprintf('%s/%s/%s', Handler.TXS_PATH, Handler.KEYS_PATH, fqId), getPaginationQueryParams(page, txPerPage))
    if (apiResponse.getStatusCode() === HttpStatus.OK) {
      return deserialize(TxResults, JSON.parse(apiResponse.getBody()))
    } else {
      throw ApiError.fromJSON(apiResponse.getBody())
    }
  }

  /**
   * fetches the API to return any tx by its hash.
   * @param hash {string}
   * @returns {Promise<TxResult>}
   */
  async retrieveTx(hash) {
    const apiResponse = await this._apiClient.get(sprintf('%s/%s', Handler.TXS_PATH, hash))
    if (apiResponse.getStatusCode() === HttpStatus.OK) {
      return deserialize(TxResult, JSON.parse(apiResponse.getBody()))
    } else {
      throw ApiError.fromJSON(apiResponse.getBody())
    }
  }

  /**
   * fetches the API and returns a certificate from the state.
   * @param fqId {string}
   * @returns {Promise<Object>}
   */
  async retrieveCertificate(fqId) {
    const apiResponse = await this._apiClient.get(sprintf('%s/%s/%s', Handler.STATE_PATH, Handler.CERTIFICATES_PATH, fqId))
    if (apiResponse.getStatusCode() === HttpStatus.OK) {
      return deserializeTxData(JSON.parse(apiResponse.getBody()))
    } else {
      throw ApiError.fromJSON(apiResponse.getBody())
    }
  }

  /**
   * fetches the API and returns a secret from the state.
   * @param fqId {string}
   * @returns {Promise<Object>}
   */
  async retrieveSecret(fqId) {
    const apiResponse = await this._apiClient.get(sprintf('%s/%s/%s', Handler.STATE_PATH, Handler.SECRETS_PATH, fqId))
    if (apiResponse.getStatusCode() === HttpStatus.OK) {
      return deserializeTxData(JSON.parse(apiResponse.getBody()))
    } else {
      throw ApiError.fromJSON(apiResponse.getBody())
    }
  }

  /**
   * fetches the API and returns a key from the state.
   * @param fqId {string}
   * @returns {Promise<KeyV1>}
   */
  async retrieveKey(fqId) {
    const apiResponse = await this._apiClient.get(sprintf('%s/%s/%s', Handler.STATE_PATH, Handler.KEYS_PATH, fqId))
    if (apiResponse.getStatusCode() === HttpStatus.OK) {
      return deserialize(KeyV1, JSON.parse(apiResponse.getBody()))
    } else {
      throw ApiError.fromJSON(apiResponse.getBody())
    }
  }

  /**
   * fetches the API and returns a list of keys for a company from the state.
   * @param companyBcId {string}
   * @param page {int}
   * @param txPerPage {int}
   * @returns {Promise<KeyV1[]>}
   */
  async retrieveCompanyKeys(companyBcId, page, txPerPage) {
    const apiResponse = await this._apiClient.get(sprintf('%s/%s/%s/%s', Handler.STATE_PATH, Handler.COMPANIES_PATH, companyBcId, Handler.KEYS_PATH), getPaginationQueryParams(page, txPerPage))
    if (apiResponse.getStatusCode() === HttpStatus.OK) {
      return deserialize(KeyV1, JSON.parse(apiResponse.getBody()))
    } else {
      throw ApiError.fromJSON(apiResponse.getBody())
    }
  }


  /**
   * accepts an encoded tx and sends it to the Api to return its status and its hash.
   * @param tx {Tx}
   * @returns {Promise<SendTxResult>}
   */
  async sendTx(tx) {
    const apiResponse = await this._apiClient.post(Handler.TXS_PATH, JSON.stringify(serialize(tx)))
    if (apiResponse.getStatusCode() === HttpStatus.ACCEPTED) {
      return deserialize(SendTxResult, JSON.parse(apiResponse.getBody()))
    } else {
      throw ApiError.fromJSON(apiResponse.getBody())
    }
  }

  /**
   * creates a tx data state, signs it and returns a tx ready to be encoded and sent.
   * @param txSigner {TxSigner}
   * @param chainID {string}
   * @param nonceTime {string}
   * @param txData {Object}
   * @returns {Tx}
   */
  signTx(txSigner, chainID, nonceTime, txData) {
    const txDataState = this.getTxDataState(chainID, nonceTime, txData)
    const signature = txSigner.getPrivateKey().sign(txDataState)
    return new Tx(nonceTime, txData, txSigner.getFqId(), signature)
  }

  /**
   * returns the sorted and marshaled json representation of a TxData ready to be signed.
   * @param chainID {string}
   * @param nonceTime {string}
   * @param txData {Object}
   * @returns {Buffer}
   */
  getTxDataState(chainID, nonceTime, txData) {
    const txDataStateModelSchema = createSimpleSchema({
      chain_id: true,
      data: txDataPropSchema(),
      nonce_time: true,
    })
    return Buffer.from(JSON.stringify(serialize(txDataStateModelSchema, {
      chain_id: chainID,
      data: txData,
      nonce_time: nonceTime,
    })), 'utf8')
  }

}

Handler.LAST_PATH = 'last'
Handler.STATE_PATH = 'state'
Handler.TXS_PATH = 'txs'
Handler.CERTIFICATES_PATH = 'certificates'
Handler.SECRETS_PATH = 'secrets'
Handler.COMPANIES_PATH = 'companies'
Handler.KEYS_PATH = 'keys'

module.exports = {
  Handler,
}
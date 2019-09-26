/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const { Client } = require('./client')
const { sprintf } = require('../utils/string')
const { ApiError } = require('../errors/apiError')
const { TxStatus } = require('../entity/api/txStatus')
const { TxWrapper } = require('../entity/api/txWrapper')
const { TxWrappers } = require('../entity/api/txWrappers')
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
   * accepts a tx and sends it to the appropriate certificate API route.
   * @param tx {Tx}
   * @return {Promise<TxStatus>}
   */
  sendCertificate(tx) {
    return this.sendTx(sprintf('/%s/%s', Handler.ROUTE_CERTIFICATES, Handler.PATH_CERTIFY), tx)
  }

  /**
   * accepts a tx and sends it to the appropriate API route.
   * @param tx {Tx}
   * @param companyChainID {string}
   * @param certificateUuid {string}
   * @return {Promise<TxStatus>}
   */
  async sendSecret(tx, companyChainID, certificateUuid) {
    return this.sendTx(sprintf(sprintf('/%s/%s', Handler.ROUTE_SECRETS, Handler.PATH_CERTIFY), companyChainID, certificateUuid), tx)
  }

  /**
   * fetches the API and returns a tx wrapper.
   * @param uuid {string}
   * @return {Promise<TxWrapper>}
   */
  async retrieveCertificate(uuid) {
    const apiResponse = await this._apiClient.get(sprintf('/%s/%s', Handler.ROUTE_CERTIFICATES, uuid))
    if (apiResponse.getStatusCode() === HttpStatus.OK) {
      return deserialize(TxWrapper, JSON.parse(apiResponse.getBody()))
    } else {
      throw ApiError.fromJSON(apiResponse.getBody())
    }
  }

  /**
   * fetches the API and returns a tx wrappers.
   * @param uuid {string}
   * @return {Promise<TxWrappers>}
   */
  async retrieveCertificatesHistory(uuid) {
    const apiResponse = await this._apiClient.get(sprintf('/%s/%s/%s', Handler.ROUTE_CERTIFICATES, uuid, Handler.PATH_HISTORY))
    if (apiResponse.getStatusCode() === HttpStatus.OK) {
      return deserialize(TxWrappers, JSON.parse(apiResponse.getBody()))
    } else {
      throw ApiError.fromJSON(apiResponse.getBody())
    }
  }

  /**
   * fetches the API and returns a tx wrapper list.
   * @param uuid {string}
   * @return {Promise<TxWrappers>}
   */
  async retrieveSecrets(uuid) {
    const apiResponse = await this._apiClient.get(sprintf('/%s/%s', Handler.ROUTE_SECRETS, uuid))
    if (apiResponse.getStatusCode() === HttpStatus.OK) {
      return deserialize(TxWrappers, JSON.parse(apiResponse.getBody()))
    } else {
      throw ApiError.fromJSON(apiResponse.getBody())
    }
  }

  /**
   * tries to send a tx to the API and returns a tx status or throws an api error.
   * @param route {string}
   * @param tx {Tx}
   * @return {Promise<TxStatus>}
   */
  async sendTx(route, tx) {
    const apiResponse = await this._apiClient.post(route, JSON.stringify(serialize(tx)))
    if (apiResponse.getStatusCode() === HttpStatus.ACCEPTED) {
      return deserialize(TxStatus, JSON.parse(apiResponse.getBody()))
    } else {
      throw ApiError.fromJSON(apiResponse.getBody())
    }
  }
}

Handler.ROUTE_CERTIFICATES = 'certificates'
Handler.ROUTE_SECRETS = 'secrets'
Handler.PATH_HISTORY = 'history'
Handler.PATH_CERTIFY = 'certify'

module.exports = {
  Handler,
}
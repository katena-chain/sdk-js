/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const nodeFetch = require('node-fetch')
const { RawResponse } = require('../entity/api/rawResponse')
const { getUri } = require('../utils/common')

/**
 * Client is a node-fetch wrapper to dialog with a JSON API.
 */
class Client {

  /**
   * Client constructor.
   * @param apiUrl {string}
   */
  constructor(apiUrl) {
    this._apiUrl = apiUrl
  }

  /**
   * wraps the doRequest method to do a GET HTTP request.
   * @param route {string}
   * @param queryParams {Object}
   * @returns {Promise<RawResponse>}
   */
  get(route, queryParams = null) {
    return this.doRequest('GET', route, '', queryParams)
  }

  /**
   * wraps the doRequest method to do a POST HTTP request.
   * @param route {string}
   * @param body {string}
   * @param queryParams {Object}
   * @returns {Promise<RawResponse>}
   */
  post(route, body, queryParams = null) {
    return this.doRequest('POST', route, body, queryParams)
  }

  /**
   * uses the node-fetch library to call a distant api and returns a response.
   * @param method {string}
   * @param route {string}
   * @param body {string}
   * @param queryParams {Object}
   * @returns {Promise<RawResponse>}
   */

  async doRequest(method, route, body, queryParams) {
    const uri = getUri(this._apiUrl, [route], queryParams)
    const options = {
      method,
    }
    if (body !== '') {
      options.headers = { 'Content-Type': 'application/json' }
      options.body = body
    }
    const response = await nodeFetch(uri, options)
    return new RawResponse(response.status, await response.text())
  }

}

module.exports = {
  Client,
}
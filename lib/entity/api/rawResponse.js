/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

/**
 * RawResponse is a ResponseInterface wrapper.
 */
class RawResponse {

  /**
   * RawResponse constructor.
   * @param statusCode {int}
   * @param body {string}
   */
  constructor(statusCode, body) {
    this._statusCode = statusCode
    this._body = body
  }

  /**
   * @returns int
   */
  getStatusCode() {
    return this._statusCode
  }

  /**
   * @returns string
   */
  getBody() {
    return this._body
  }
}

module.exports = {
  RawResponse: RawResponse,
}
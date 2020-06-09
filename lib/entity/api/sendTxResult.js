/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const { createModelSchema, object, primitive, alias } = require('serializr')
const { TxStatus } = require('./txStatus')

/**
 * SendTxResult is returned by a POST request to retrieve the tx status and its hash.
 */
class SendTxResult {

  /**
   * SendTxResult constructor.
   * @param hash {string}
   * @param status {TxStatus}
   */
  constructor(hash, status) {
    this._hash = hash
    this._status = status
  }

  /**
   * @returns {string}
   */
  getHash() {
    return this._hash
  }

  /**
   * @returns {TxStatus}
   */
  getStatus() {
    return this._status
  }

}

createModelSchema(SendTxResult, {
  _hash: alias('hash', primitive()),
  _status: alias('status', object(TxStatus)),

})

module.exports = {
  SendTxResult: SendTxResult,
}
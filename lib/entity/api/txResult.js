/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const { createModelSchema, object, primitive, alias } = require('serializr')
const { Tx } = require('../tx')
const { TxStatus } = require('./txStatus')

/**
 * TxResult is returned by a GET request to retrieve a tx with useful information about its processing.
 */
class TxResult {

  /**
   * TxResult constructor.
   * @param hash {string}
   * @param height {int}
   * @param index {int}
   * @param tx {Tx}
   * @param status {TxStatus}
   */
  constructor(hash, height, index, tx, status) {
    this._hash = hash
    this._height = height
    this._index = index
    this._tx = tx
    this._status = status
  }

  /**
   * @returns {int}
   */
  getIndex() {
    return this._index
  }

  /**
   * @returns {int}
   */
  getHeight() {
    return this._height
  }

  /**
   * @returns {string}
   */
  getHash() {
    return this._hash
  }

  /**
   * @returns {Tx}
   */
  getTx() {
    return this._tx
  }

  /**
   * @returns {TxStatus}
   */
  getStatus() {
    return this._status
  }

}

createModelSchema(TxResult, {
  _hash: alias('hash', primitive()),
  _height: alias('height', primitive()),
  _index: alias('index', primitive()),
  _tx: alias('tx', object(Tx)),
  _status: alias('status', object(TxStatus)),

})

module.exports = {
  TxResult: TxResult,
}
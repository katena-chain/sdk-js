/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const { createModelSchema, custom, deserialize, serialize, alias } = require('serializr')
const { Tx } = require('../tx')
const { TxStatus } = require('./txStatus')

/**
 * TxWrapper wraps a Tx with its status.
 */
class TxWrapper {

  /**
   * TxWrapper constructor.
   * @param tx {Tx}
   * @param status {TxStatus}
   */
  constructor(tx, status) {
    this._tx = tx
    this._status = status
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

createModelSchema(TxWrapper, {
  _tx: alias('tx', custom(
    function (v) {
      return serialize(v)
    },
    function (v) {
      return deserialize(Tx, v)
    },
  )),
  _status: alias('status', custom(
    function (v) {
      return serialize(v)
    },
    function (v) {
      return deserialize(TxStatus, v)
    },
  )),

})

module.exports = {
  TxWrapper: TxWrapper,
}
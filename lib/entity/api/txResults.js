/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const { TxResult } = require('./txResult')
const { createModelSchema, object, list, primitive, alias } = require('serializr')

/**
 * TxResults is returned by a GET request to retrieve a list of TxResult with the total txs available.
 */
class TxResults {

  /**
   * TxResults constructor.
   * @param txs {TxResult[]}
   * @param total {int}
   */
  constructor(txs, total) {
    this._txs = txs
    this._total = total
  }

  /**
   * @returns {TxResult[]}
   */
  getTxs() {
    return this._txs
  }

  /**
   * @returns {int}
   */
  getTotal() {
    return this._total
  }

}

createModelSchema(TxResults, {
  _txs: alias('txs', list(object(TxResult))),
  _total: alias('total', primitive()),

})

module.exports = {
  TxResults: TxResults,
}
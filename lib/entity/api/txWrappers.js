/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const { TxWrapper } = require('./txWrapper')
const { createModelSchema, custom, primitive, deserialize, serialize, alias } = require('serializr')

/**
 * TxWrappers wraps a list of TxWrapper with the total txs available.
 */
class TxWrappers {

  /**
   * TxWrappers constructor.
   * @param txs {TxWrapper[]}
   * @param total {int}
   */
  constructor(txs, total) {
    this._txs = txs
    this._total = total
  }

  /**
   * @returns {TxWrapper[]}
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

createModelSchema(TxWrappers, {
  _txs: alias('txs', custom(
    function (v) {
      let result = []
      for (let tx in v) {
        result.push(serialize(tx))
      }
      return result
    },
    function (v) {
      let result = []
      v.forEach(tx => {
        result.push(deserialize(TxWrapper, tx))
      })

      return result
    },
  )),
  _total: alias('total', primitive()),

})

module.exports = {
  TxWrappers: TxWrappers,
}
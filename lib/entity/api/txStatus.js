/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const { createModelSchema, primitive, alias } = require('serializr')

/**
 * TxStatus is a tx blockchain status.
 * 0: OK
 * 1: PENDING
 * >1: ERROR WITH CORRESPONDING CODE
 */
class TxStatus {

  /**
   * TxStatus constructor.
   * @param code {Number}
   * @param message {string}
   */
  constructor(code, message) {
    this._code = code
    this._message = message
  }

  /**
   * code getter.
   * @return {Number}
   */
  getCode() {
    return this._code
  }

  /**
   * message getter.
   * @return {string}
   */
  getMessage() {
    return this._message
  }

}

createModelSchema(TxStatus, {
  _code: alias('code', primitive()),
  _message: alias('message', primitive())
})

module.exports = {
  TxStatus: TxStatus,
}
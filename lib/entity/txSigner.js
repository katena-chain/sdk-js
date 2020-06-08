/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

/**
 * TxSigner contains all information about a Tx signer.
 */
class TxSigner {

  /**
   * TxSigner constructor.
   * @param fqId {string}
   * @param privateKey {PrivateKeyEd25519}
   */
  constructor(fqId, privateKey) {
    this._fqId = fqId
    this._privateKey = privateKey
  }

  /**
   * @returns {string}
   */
  getFqId() {
    return this._fqId
  }

  /**
   * @returns {PrivateKeyEd25519}
   */
  getPrivateKey() {
    return this._privateKey
  }

}

module.exports = {
  TxSigner: TxSigner,
}
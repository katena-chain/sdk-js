/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const tweetNacl = require('tweetnacl/nacl')
const { PublicKeyEd25519 } = require('./publicKeyEd25519')
const { AbstractKey } = require('../abstractKey')

/**
 * PrivateKeyEd25519 is an Ed25519 private key wrapper (64 bytes).
 */
class PrivateKeyEd25519 extends AbstractKey {

  /**
   * PrivateKeyEd25519 constructor.
   * @param privateKey {Buffer}
   */
  constructor(privateKey) {
    super(privateKey)
    this._publicKey = new PublicKeyEd25519(Buffer.from(privateKey.subarray(32), 'binary'))
  }

  /**
   * @returns {PublicKeyEd25519}
   */
  getPublicKey() {
    return this._publicKey
  }

  /**
   * accepts a message and returns its corresponding Ed25519 signature.
   * @param message {Buffer}
   * @returns {Buffer}
   */
  sign(message) {
    return Buffer.from(tweetNacl.sign.detached(message, this.getKey()), 'binary')
  }
}

module.exports = {
  PrivateKeyEd25519,
}
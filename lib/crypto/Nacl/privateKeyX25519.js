/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const { PublicKeyX25519 } = require('./publicKeyX25519')
const tweetNacl = require('tweetnacl/nacl')
const crypto = require('crypto')
const { AbstractKey } = require('../abstractKey')

/**
 * PrivateKeyX25519 is an X25519 private key wrapper (64 bytes).
 */
class PrivateKeyX25519 extends AbstractKey {

  /**
   * PrivateKeyX25519 constructor.
   * @param privateKey {Buffer}
   */
  constructor(privateKey) {
    super(privateKey)
    this._publicKey = new PublicKeyX25519(Buffer.from(privateKey.subarray(32), 'binary'))
  }

  /**
   * encrypts a plain text message decipherable afterwards by the recipient public key.
   * @param message {Buffer}
   * @param recipientPublicKey  {PublicKeyX25519}
   * @returns {{encryptedMessage: Buffer, nonce: Buffer}}
   */
  seal(message, recipientPublicKey) {
    const nonce = crypto.randomBytes(24)
    const encryptedMessage = Buffer.from(tweetNacl.box(message, nonce, recipientPublicKey.getKey(), this.getKey().subarray(0, 32)), 'binary')
    return {
      encryptedMessage,
      nonce,
    }
  }

  /**
   * decrypts an encrypted message with the appropriate sender information.
   * @param encryptedMessage {Buffer}
   * @param senderPublicKey {PublicKeyX25519}
   * @param nonce {Buffer}
   * @returns {Buffer}
   */
  open(encryptedMessage, senderPublicKey, nonce) {
    let decryptedMessage = tweetNacl.box.open(encryptedMessage, nonce, senderPublicKey.getKey(), this.getKey().subarray(0, 32))
    if (!decryptedMessage) {
      decryptedMessage = ''
    }
    return Buffer.from(decryptedMessage, 'binary')
  }

  /**
   * @returns {PublicKeyX25519}
   */
  getPublicKey() {
    return this._publicKey
  }

}

module.exports = {
  PrivateKeyX25519,
}
/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const tweetNacl = require('tweetnacl/nacl')
const { PrivateKeyEd25519 } = require('../crypto/Ed25519/privateKeyEd25519')
const { PublicKeyEd25519 } = require('../crypto/Ed25519/publicKeyEd25519')
const { PrivateKeyX25519 } = require('../crypto/Nacl/privateKeyX25519')
const { PublicKeyX25519 } = require('../crypto/Nacl/publicKeyX25519')

/**
 * accepts a base64 encoded Ed25519 private key (88 chars) and returns an Ed25519 private key.
 * @param privateKeyBase64 {string}
 * @returns {PrivateKeyEd25519}
 */
function createPrivateKeyEd25519FromBase64(privateKeyBase64) {
  return new PrivateKeyEd25519(Buffer.from(privateKeyBase64, 'base64'))
}

/**
 * accepts a base64 encoded Ed25519 public key (44 chars) and returns an Ed25519 public key.
 * @param publicKeyBase64 {string}
 * @returns {PublicKeyEd25519}
 */
function createPublicKeyEd25519FromBase64(publicKeyBase64) {
  return new PublicKeyEd25519(Buffer.from(publicKeyBase64, 'base64'))
}

/**
 * generates a new ed25519 private key.
 * @returns {PrivateKeyEd25519}
 */
function generateNewPrivateKeyEd25519() {
  const keyPair = tweetNacl.sign.keyPair()
  return {
    privateKey: new PrivateKeyEd25519(Buffer.from(keyPair.secretKey, 'binary')),
    publicKey: new PublicKeyEd25519(Buffer.from(keyPair.publicKey, 'binary')),
  }
}

/**
 * accepts a base64 encoded X25519 private key (44 chars) and returns an X25519 private key.
 * @param publicKeyBase64 {string}
 * @returns {PublicKeyX25519}
 */
function createPublicKeyX25519FromBase64(publicKeyBase64) {
  return new PublicKeyX25519(Buffer.from(publicKeyBase64, 'base64'))
}

/**
 * accepts a base64 encoded X25519 public key (44 chars) and returns an X25519 public key.
 * @param privateKeyBase64 {string}
 * @returns {PrivateKeyX25519}
 */
function createPrivateKeyX25519FromBase64(privateKeyBase64) {
  return new PrivateKeyX25519(Buffer.from(privateKeyBase64, 'base64'))
}

/**
 * generates a new x25519 private key.
 * @returns {{privateKey: PrivateKeyX25519, publicKey: PublicKeyX25519}}
 */
function generateNewPrivateKeyX25519() {
  const keyPair = tweetNacl.box.keyPair()
  return {
    privateKey: new PrivateKeyX25519(Buffer.from(keyPair.secretKey, 'binary')),
    publicKey: new PublicKeyX25519(Buffer.from(keyPair.publicKey, 'binary')),
  }
}

module.exports = {
  createPrivateKeyEd25519FromBase64,
  createPublicKeyEd25519FromBase64,
  createPublicKeyX25519FromBase64,
  createPrivateKeyX25519FromBase64,
  generateNewPrivateKeyEd25519,
  generateNewPrivateKeyX25519,
}
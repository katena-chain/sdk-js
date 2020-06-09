/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const { AbstractKey } = require('../abstractKey')

/**
 * PublicKeyX25519 is an Nacl public key wrapper (32 bytes).
 */
class PublicKeyX25519 extends AbstractKey {
}

module.exports = {
  PublicKeyX25519,
}
/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const { AbstractKey } = require('../abstractKey')
const { createModelSchema, custom } = require('serializr')

/**
 * PublicKeyX25519 is an Nacl public key wrapper (32 bytes).
 */
class PublicKeyX25519 extends AbstractKey {
}

createModelSchema(PublicKeyX25519,
  {
    _key: custom(
      function (v) {
        return v.toString('base64')
      },
      function (v) {
        return Buffer.from(v, 'base64')
      }),
  },
)

module.exports = {
  PublicKeyX25519,
}
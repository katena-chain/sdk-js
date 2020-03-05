/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

/**
 * return a schema to serialize/deserialize an abstract key field.
 * @param clazz {AbstractKey}
 * @returns {Object}
 */
function publicKeySchema(clazz) {
  return {
    serializer: function (v) {
      return v.getKey().toString('base64')
    },
    deserializer: function (v, done) {
      return done(null, new clazz(Buffer.from(v, 'base64')))
    },
  }
}

/**
 * returns a schema to serialize/deserialize a Buffer field.
 * @returns {Object}
 */
function byteSchema() {
  return {
    serializer: function (v) {
      return v.toString('base64')
    },
    deserializer: function (v, done) {
      return done(null, Buffer.from(v, 'base64'))
    },
  }
}

module.exports = { publicKeySchema, byteSchema }
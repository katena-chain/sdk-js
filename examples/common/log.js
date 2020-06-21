/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const { serialize } = require('serializr')
const { sprintf } = require('../../lib/utils/string')
const { serializeTxData } = require('../../lib/serializer/txData')

function printlnJson(data) {
  let encodedData
  if (typeof data.getType === 'function' && typeof data.getNamespace === 'function' && typeof data.getStateIds === 'function') {
    encodedData = serializeTxData(data)
  } else {
    encodedData = serialize(data)
  }
  const jsonStr = JSON.stringify(encodedData,null, 2)
  console.log(sprintf('%s\n', jsonStr))
}

module.exports = {
  printlnJson: printlnJson,
}
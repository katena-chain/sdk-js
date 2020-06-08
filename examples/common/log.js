/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const { serialize } = require('serializr')
const { sprintf } = require('../../lib/utils/string')

function printlnJson(data) {
  const encodedData = JSON.stringify(serialize(data),null, 2)
  console.log(sprintf('%s\n', encodedData))
}

module.exports = {
  printlnJson: printlnJson,
}
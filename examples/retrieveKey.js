/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const { Transactor } = require('../lib/transactor')
const { DEFAULT_PER_PAGE_PARAM } = require('../lib/utils/common')
const { printlnJson } = require('./common/log')
const { defaultSettings } = require('./common/settings')

async function main() {
  // Alice wants to retrieve a key and its related txs

  // Load default configuration
  const settings = defaultSettings()

  // Common Katena network information
  const apiUrl = settings.apiUrl

  // Alice Katena network information
  const aliceCompanyBcId = settings.company.bcId

  // Create a Katena API helper
  const transactor = new Transactor(apiUrl)

  // Key id Alice wants to retrieve
  const keyId = settings.keyId

  try {

    // Retrieve txs related to the key fqid
    const txResults = await transactor.retrieveKeyTxs(aliceCompanyBcId, keyId, 1, DEFAULT_PER_PAGE_PARAM)

    console.log('Tx list :')
    printlnJson(txResults)

    // Retrieve the last tx related to the key fqid
    const txResult = await transactor.retrieveLastKeyTx(aliceCompanyBcId, keyId)

    console.log('Last Tx :')
    printlnJson(txResult)

    // Retrieve the last state of a key with that fqid
    const key = await transactor.retrieveKey(aliceCompanyBcId, keyId)

    console.log('Key :')
    printlnJson(key)

  } catch (e) {
    if (e.name === 'ApiError') {
      console.log(e.toString())
    } else {
      console.log(e)
    }
  }
}

main().then()
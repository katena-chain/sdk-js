/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const { Transactor } = require('../lib/transactor')
const { printlnJson } = require('./common/log')
const { defaultSettings } = require('./common/settings')

async function main() {
  // Alice wants to retrieve the keys of its company

  // Load default configuration
  const settings = defaultSettings()

  // Common Katena network information
  const apiUrl = settings.apiUrl

  // Alice Katena network information
  const aliceCompanyBcId = settings.company.bcId

  // Create a Katena API helper
  const transactor = new Transactor(apiUrl)

  try {

    // Retrieve the keys from Katena
    const keys = await transactor.retrieveCompanyKeys(aliceCompanyBcId, 1, settings.txPerPage)

    console.log('Keys list :')
    printlnJson(keys)

  } catch (e) {
    if (e.name === 'ApiError') {
      console.log(e.toString())
    } else {
      console.log(e)
    }
  }
}

main().then()
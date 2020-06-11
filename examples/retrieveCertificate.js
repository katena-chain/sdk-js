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
  // Alice wants to retrieve txs related to a certificate

  // Load default configuration
  const settings = defaultSettings()

  // Common Katena network information
  const apiUrl = settings.apiUrl

  // Alice Katena network information
  const aliceCompanyBcId = settings.company.bcId

  // Create a Katena API helper
  const transactor = new Transactor(apiUrl)

  // Certificate id Alice wants to retrieve
  const certificateId = settings.certificateId

  try {

    // Retrieve txs related to the certificate fqid
    const txResults = await transactor.retrieveCertificateTxs(aliceCompanyBcId, certificateId, 1, settings.txPerPage)

    console.log('Tx list :')
    printlnJson(txResults)

    // Retrieve the last tx related to the certificate fqid
    const txResult = await transactor.retrieveLastCertificateTx(aliceCompanyBcId, certificateId)

    console.log('Last Tx :')
    printlnJson(txResult)

  } catch (e) {
    if (e.name === 'ApiError') {
      console.log(e.toString())
    } else {
      console.log(e)
    }
  }
}

main().then()
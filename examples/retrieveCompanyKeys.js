/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const { Transactor } = require('../lib/transactor')
const { sprintf } = require('../lib/utils/string')
const { DEFAULT_PER_PAGE_PARAM } = require('../lib/utils/common')

async function main() {
  // Alice wants to retrieve the keys of its company

  // Common Katena network information
  const apiUrl = 'https://nodes.test.katena.transchain.io/api/v1'

  // Alice Katena network information
  const aliceCompanyBcid = 'abcdef'

  // Create a Katena API helper
  const transactor = new Transactor(apiUrl)

  try {

    // Retrieve the keys from Katena
    const keys = await transactor.retrieveCompanyKeys(aliceCompanyBcid, 1, DEFAULT_PER_PAGE_PARAM)
    keys.forEach(key => {

      console.log('KeyV1')
      console.log(sprintf('  Company bcid : %s', key.getCompanyBcid()))
      console.log(sprintf('  Public key   : %s', key.getPublicKey().getKey().toString('base64')))
      console.log(sprintf('  Is active    : %s', key.getIsActive()))
      console.log(sprintf('  Role         : %s', key.getRole()))
      console.log('')
    })

  } catch (e) {
    if (e.name === 'ApiError') {
      console.log(e.toString())
    } else {
      console.log(e)
    }
  }
}

main().then()
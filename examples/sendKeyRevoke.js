/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const { createPrivateKeyEd25519FromBase64 } = require('../lib/utils/crypto')
const { Transactor } = require('../lib/transactor')
const { TxSigner } = require('../lib/entity/txSigner')
const { concatFqId } = require('../lib/utils/common')
const { printlnJson } = require('./common/log')
const { defaultSettings } = require('./common/settings')

async function main() {
  // Alice wants to revoke a key for its company

  // Load default configuration
  const settings = defaultSettings()

  // Common Katena network information
  const apiUrl = settings.apiUrl
  const chainID = settings.chainId

  // Alice Katena network information
  const aliceCompanyBcId = settings.company.bcId
  const aliceSignKeyInfo = settings.company.ed25519Keys.alice
  const aliceSignPrivateKey = createPrivateKeyEd25519FromBase64(aliceSignKeyInfo.privateKeyStr)
  const aliceSignPrivateKeyId = aliceSignKeyInfo.id

  // Create a Katena API helper
  const txSigner = new TxSigner(concatFqId(aliceCompanyBcId, aliceSignPrivateKeyId), aliceSignPrivateKey)
  const transactor = new Transactor(apiUrl, chainID, txSigner)

  // Information Alice wants to send
  const keyId = settings.keyId

  try {

    // Send a version 1 of a key revoke on Katena
    const txResult = await transactor.sendKeyRevokeV1Tx(keyId)

    console.log('Result :')
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
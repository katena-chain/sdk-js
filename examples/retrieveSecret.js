/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const { createPrivateKeyX25519FromBase64 } = require('../lib/utils/crypto')
const { Transactor } = require('../lib/transactor')
const { sprintf } = require('../lib/utils/string')
const { printlnJson } = require('./common/log')
const { defaultSettings } = require('./common/settings')

async function main() {
  // Bob wants to read a nacl box secret from Alice to decrypt an off-chain data

  // Load default configuration
  const settings = defaultSettings()

  // Common Katena network information
  const apiUrl = settings.apiUrl

  // Alice Katena network information
  const aliceCompanyBcId = settings.company.bcId

  // Create a Katena API helper
  const transactor = new Transactor(apiUrl, aliceCompanyBcId)

  // Nacl box information
  const bobCryptKeyInfo = settings.offChain.x25519Keys.bob
  const bobCryptPrivateKey = createPrivateKeyX25519FromBase64(bobCryptKeyInfo.privateKeyStr)

  // Secret id Bob wants to retrieve secrets
  const secretId = settings.secretId

  try {

    // Retrieve txs related to the secret fqid
    const txResults = await transactor.retrieveSecretTxs(aliceCompanyBcId, secretId, 1, settings.txPerPage)

    console.log('Tx list :')
    printlnJson(txResults)

    // Retrieve the last tx related to the secret fqid
    const txResult = await transactor.retrieveLastSecretTx(aliceCompanyBcId, secretId)

    console.log('Last Tx :')
    printlnJson(txResult)

    const txData = txResult.getTx().getData()
    // Bob will use its private key and the sender's public key (needs to be Alice's) to decrypt a message
    let decryptedContent = bobCryptPrivateKey.open(
      txData.getContent(),
      txData.getSender(),
      txData.getNonce(),
    ).toString('utf8')

    if (decryptedContent === '') {
      decryptedContent = 'Unable to decrypt'
    }
    console.log(sprintf('Decrypted content for last Tx : %s', decryptedContent))

  } catch (e) {
    if (e.name === 'ApiError') {
      console.log(e.toString())
    } else {
      console.log(e)
    }
  }
}

main().then()
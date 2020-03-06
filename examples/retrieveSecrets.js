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
const { DEFAULT_PER_PAGE_PARAM } = require('../lib/utils/common')

async function main() {
  // Bob wants to read a nacl box secret from Alice to decrypt an off-chain data

  // Common Katena network information
  const apiUrl = 'https://nodes.test.katena.transchain.io/api/v1'

  // Alice Katena network information
  const aliceCompanyBcid = 'abcdef'

  // Create a Katena API helper
  const transactor = new Transactor(apiUrl, aliceCompanyBcid)

  // Nacl box information
  const bobCryptPrivateKeyBase64 = 'quGBP8awD/J3hjSvwGD/sZRcMDks8DPz9Vw0HD4+zecqJP0ojBoc4wQtyq08ywxUksTkdz0/rQNkOsEZBwqWTw=='
  const bobCryptPrivateKey = createPrivateKeyX25519FromBase64(bobCryptPrivateKeyBase64)

  // Secret uuid Bob wants to retrieve secrets
  const secretUuid = '2075c941-6876-405b-87d5-13791c0dc53a'

  try {

    // Retrieve version 1 of secrets from Katena blockchain
    const txWrappers = await transactor.retrieveSecrets(aliceCompanyBcid, secretUuid, 1, DEFAULT_PER_PAGE_PARAM)

    txWrappers.getTxs().forEach(txWrapper => {
      const txData = txWrapper.getTx().getData()
      console.log('Transaction status')
      console.log(sprintf('  Code    : %s', txWrapper.getStatus().getCode().toString()))
      console.log(sprintf('  Message : %s', txWrapper.getStatus().getMessage()))

      console.log('SecretNaclBoxV1')
      console.log(sprintf('  Id                : %s', txData.getId()))
      console.log(sprintf('  Data sender       : %s', txData.getSender().getKey().toString('base64')))
      console.log(sprintf('  Data nonce        : %s', txData.getNonce().toString('base64')))
      console.log(sprintf('  Data content      : %s', txData.getContent().toString('base64')))

      // Bob will use its private key and the sender's public key (needs to be Alice's) to decrypt a message
      let decryptedContent = bobCryptPrivateKey.open(
        txData.getContent(),
        txData.getSender(),
        txData.getNonce(),
      ).toString('utf8')

      if (decryptedContent === '') {
        decryptedContent = 'Unable to decrypt'
      }
      console.log(sprintf('  Decrypted content : %s', decryptedContent))
      console.log()
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
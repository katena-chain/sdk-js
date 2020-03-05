/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const { createPrivateKeyEd25519FromBase64, createPublicKeyEd25519FromBase64 } = require('../lib/utils/crypto')
const { Transactor } = require('../lib/transactor')
const { sprintf } = require('../lib/utils/string')

async function main() {
  // Alice wants to revoke a key for its company

  // Common Katena network information
  const apiUrl = 'https://nodes.test.katena.transchain.io/api/v1'
  const chainID = 'katena-chain-test'

  // Alice Katena network information
  const aliceSignPrivateKeyBase64 = '7C67DeoLnhI6jvsp3eMksU2Z6uzj8sqZbpgwZqfIyuCZbfoPcitCiCsSp2EzCfkY52Mx58xDOyQLb1OhC7cL5A=='
  const aliceCompanyChainID = 'abcdef'
  const aliceSignPrivateKey = createPrivateKeyEd25519FromBase64(aliceSignPrivateKeyBase64)

  // Create a Katena API helper
  const transactor = new Transactor(apiUrl, aliceCompanyChainID, chainID, aliceSignPrivateKey)

  // Information Alice wants to send
  const keyRevokeUuid = '2075c941-6876-405b-87d5-13791c0dc53a'
  const publicKeyBase64 = 'gaKih+STp93wMuKmw5tF5NlQvOlrGsahpSmpr/KwOiw='
  const publicKey = createPublicKeyEd25519FromBase64(publicKeyBase64)

  try {

    // Send a version 1 of a key revoke on Katena
    const txStatus = await transactor.sendKeyRevokeV1(keyRevokeUuid, publicKey)

    console.log('Transaction status')
    console.log(sprintf('  Code    : %s', txStatus.getCode().toString()))
    console.log(sprintf('  Message : %s', txStatus.getMessage()))

  } catch (e) {
    if (e.name === 'ApiError') {
      console.log(e.toString())
    } else {
      console.log(e)
    }
  }
}

main().then()
/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const { createPrivateKeyED25519FromBase64 } = require('../lib/utils/crypto')
const { Transactor } = require('../lib/transactor')
const { sprintf } = require('../lib/utils/string')

async function main() {
  // Alice wants to certify raw off-chain information

  // Common Katena network information
  const apiUrl = 'https://api.test.katena.transchain.io/api/v1'
  const chainID = 'katena-chain-test'

  // Alice Katena network information
  const aliceSignPrivateKeyBase64 = '7C67DeoLnhI6jvsp3eMksU2Z6uzj8sqZbpgwZqfIyuCZbfoPcitCiCsSp2EzCfkY52Mx58xDOyQLb1OhC7cL5A=='
  const aliceCompanyChainId = 'abcdef'
  const aliceSignPrivateKey = createPrivateKeyED25519FromBase64(aliceSignPrivateKeyBase64)

  // Create a Katena API helper
  const transactor = new Transactor(apiUrl, aliceCompanyChainId, chainID, aliceSignPrivateKey)

  // Off chain information you want to send
  const certificateUuid = '2075c941-6876-405b-87d5-13791c0dc53a'
  const dataRawSignature = Buffer.from('off_chain_data_raw_signature_from_js', 'utf-8')
  try {

    // Send a version 1 of a certificate on Katena blockchain
    const txStatus = await transactor.sendCertificateRawV1(certificateUuid, dataRawSignature)

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
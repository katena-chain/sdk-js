/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const {
  createPrivateKeyED25519FromBase64,
  createPublicKeyX25519FromBase64,
  createPrivateKeyX25519FromBase64,
} = require('../lib/utils/crypto')
const { Transactor } = require('../lib/transactor')
const { sprintf } = require('../lib/utils/string')

async function main() {
  // Alice wants to send a nacl box secret to Bob to encrypt an off-chain data

  // Common Katena network information
  const apiUrl = 'https://api.test.katena.transchain.io/api/v1'
  const chainID = 'katena-chain-test'

  // Alice Katena network information
  const aliceSignPrivateKeyBase64 = '7C67DeoLnhI6jvsp3eMksU2Z6uzj8sqZbpgwZqfIyuCZbfoPcitCiCsSp2EzCfkY52Mx58xDOyQLb1OhC7cL5A=='
  const aliceCompanyChainId = 'abcdef'
  const aliceSignPrivateKey = createPrivateKeyED25519FromBase64(aliceSignPrivateKeyBase64)

  // Nacl box information
  const aliceCryptPrivateKeyBase64 = 'nyCzhimWnTQifh6ucXLuJwOz3RgiBpo33LcX1NjMAsP1ZkQcdlDq64lTwxaDx0lq6LCQAUeYywyMUtfsvTUEeQ=='
  const aliceCryptPrivateKey = createPrivateKeyX25519FromBase64(aliceCryptPrivateKeyBase64)
  const bobCryptPublicKeyBase64 = 'KiT9KIwaHOMELcqtPMsMVJLE5Hc9P60DZDrBGQcKlk8='
  const bobCryptPublicKey = createPublicKeyX25519FromBase64(bobCryptPublicKeyBase64)

  // Create a Katena API helper
  const transactor = new Transactor(apiUrl, aliceCompanyChainId, chainID, aliceSignPrivateKey)

  // Off-chain information Alice wants to send
  const certificateUuid = '2075c941-6876-405b-87d5-13791c0dc53a'
  const content = Buffer.from('off_chain_secret_to_crypt_from_js')

  try {
    // Alice will use its private key and Bob's public key to encrypt a message
    const encryptedInfo = aliceCryptPrivateKey.seal(content, bobCryptPublicKey)

    // Send a version 1 of a secret nacl box on Katena
    const txStatus = await transactor.sendSecretNaclBoxV1(certificateUuid, aliceCryptPrivateKey.getPublicKey(), encryptedInfo.nonce, encryptedInfo.encryptedMessage)

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
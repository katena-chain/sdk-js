/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const {
  createPrivateKeyEd25519FromBase64,
  createPublicKeyX25519FromBase64,
  createPrivateKeyX25519FromBase64,
} = require('../lib/utils/crypto')
const { Transactor } = require('../lib/transactor')
const { TxSigner } = require('../lib/entity/txSigner')
const { concatFqId } = require('../lib/utils/common')
const { printlnJson } = require('./common/log')
const { defaultSettings } = require('./common/settings')

async function main() {
  // Alice wants to send a nacl box secret to Bob to encrypt an off-chain data

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

  // Nacl box information
  const aliceCryptKeyInfo = settings.offChain.x25519Keys.alice
  const aliceCryptPrivateKey = createPrivateKeyX25519FromBase64(aliceCryptKeyInfo.privateKeyStr)
  const bobCryptKeyInfo = settings.offChain.x25519Keys.bob
  const bobCryptPublicKey = createPublicKeyX25519FromBase64(bobCryptKeyInfo.publicKeyStr)

  // Create a Katena API helper
  const txSigner = new TxSigner(concatFqId(aliceCompanyBcId, aliceSignPrivateKeyId), aliceSignPrivateKey)
  const transactor = new Transactor(apiUrl, chainID, txSigner)

  // Off-chain information Alice wants to send
  const secretId = settings.secretId
  const content = Buffer.from('off_chain_secret_to_crypt_from_js')

  try {

    // Alice will use its private key and Bob's public key to encrypt a message
    const encryptedInfo = aliceCryptPrivateKey.seal(content, bobCryptPublicKey)

    // Send a version 1 of a secret nacl box on Katena
    const txResult = await transactor.sendSecretNaclBoxV1Tx(secretId, aliceCryptPrivateKey.getPublicKey(), encryptedInfo.nonce, encryptedInfo.encryptedMessage)

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
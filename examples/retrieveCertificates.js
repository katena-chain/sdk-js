/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const { getTypeCertificateRawV1, getTypeCertificateEd25519V1 } = require('../lib/entity/certify/certify')
const { Transactor } = require('../lib/transactor')
const { sprintf } = require('../lib/utils/string')
const { DEFAULT_PER_PAGE_PARAM } = require('../lib/utils/common')

async function main() {
  // Alice wants to retrieve certificates

  // Common Katena network information
  const apiUrl = 'https://nodes.test.katena.transchain.io/api/v1'

  // Alice Katena network information
  const aliceCompanyBcid = 'abcdef'

  // Create a Katena API helper
  const transactor = new Transactor(apiUrl, aliceCompanyBcid)

  // Certificates uuid Alice wants to retrieve
  const certificateUuid = '2075c941-6876-405b-87d5-13791c0dc53a'

  try {

    // Retrieve version 1 of certificates from Katena
    const txWrappers = await transactor.retrieveCertificates(aliceCompanyBcid, certificateUuid, 1, DEFAULT_PER_PAGE_PARAM)
    txWrappers.getTxs().forEach(txWrapper => {

      const txData = txWrapper.getTx().getData()

      console.log('Transaction status')
      console.log(sprintf('  Code    : %s', txWrapper.getStatus().getCode().toString()))
      console.log(sprintf('  Message : %s', txWrapper.getStatus().getMessage()))

      switch (txData.getType()) {
        case getTypeCertificateRawV1() : {
          console.log('CertificateRawV1')
          console.log('  Id    : %s', txData.getId())
          console.log('  Value : %s', txData.getValue().toString())
          break
        }
        case getTypeCertificateEd25519V1() : {
          console.log('CertificateEd25519V1')
          console.log(sprintf('  Id             : %s', txData.getId()))
          console.log(sprintf('  Data signer    : %s', txData.getSigner().getKey().toString('base64')))
          console.log(sprintf('  Data signature : %s', txData.getSignature().toString('base64')))
          break
        }
        default:
          throw new Error('Unexpected txData type')
      }
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
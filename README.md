# SDK JS

## Requirements

- NodeJS >= 8.x

## Install

```bash
npm install @katena-chain/sdk-js
```

## Usage

To rapidly interact with our API, you can use our `Transactor` helper. It handles all the steps needed to correctly
format, sign and send a tx.

Feel free to explore and modify its code to meet your expectations.

## Examples

Detailed examples are provided in the `examples` folder to explain how to use our `Transactor` helper methods.

You can change various settings in the `examples/common/settings.js` file.

Available examples:
* Send a `Certificate` transaction
* Send a `Secret` transaction
* Send a `KeyCreate` transaction
* Send a `KeyRotate` transaction
* Send a `KeyRevoke` transaction
* Retrieve `Certificate` related transactions
* Retrieve `Secret` related transactions
* Retrieve `Key` related transactions and its state
* Retrieve a list of `Key` states for a company

For instance, to send a certificate:
```bash
node examples/sendCertificateRaw.js
```

## Katena documentation

For more information, check the [katena documentation](https://doc.katena.transchain.io).
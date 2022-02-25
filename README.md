# Private Key with Agent-js

This code shows how to take a private key and use it as an Internet Computer identity with Agent-js. Do not use the test-priv.pem file for any real applications - it is insecure.

Install the packages with 

```sh
npm install
```

We have provided you with a test .pem file. If you run `npm start`, you should should see the following output:
```
rzryb-2a4nv-axpxm-acglt-coqmg-zwnhy-dvie4-aakoj-jbhba-a6igq-cqe
```

This is a public key identity that can be consistently used by the JS agent. You can verify it gets the same principal when calling the IC using a live whoami service by running `npm run whoami`.

To generate your own private key, you can run

```sh
openssl ecparam -name secp256k1 -genkey -noout -out test-ec-secp256k1-priv-key.pem
```

Then, you should be able to run `npm start` again and reliably get your new principal. Always keep private keys in a safe place.


## Shared Identity across DFX and Node
We have provided an example of how to use the shared identity in DFX and Node.

If you install `keysmith` from https://github.com/dfinity/keysmith/releases, you can use it to generate a .pem file for `dfx`. Running `seed.js` on the same seed phrase in `seed.txt` will generate the same Principal identity.

### Security warnings
Seed phrases and PEM files must be treated with maximum security. They should be stored in a safe place and not shared with anyone.

* Do not ever commit a seed phrase to your souce code.
* THIS PATTERN SHOULD NEVER BE USED IN A FRONTEND APPLICATION
* Use a different identity for each project to mitigate risk
* Dfinity does not officially endorse doing this

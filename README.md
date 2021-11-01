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

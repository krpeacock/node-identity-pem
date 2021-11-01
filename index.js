const fs = require("fs");
const Identity = require("@dfinity/identity");
import sha256 from "sha256";

const { Secp256k1KeyIdentity } = Identity;

const rawKey = fs
  .readFileSync("test-ec-secp256k1-priv-key.pem")
  .toString()
  .replace("-----BEGIN EC PRIVATE KEY-----", "")
  .replace("-----END EC PRIVATE KEY-----", "")
  .trim();

const rawBuffer = Uint8Array.from(rawKey).buffer;

const privKey = Uint8Array.from(sha256(rawBuffer, { asBytes: true }));

// Initialize an identity from the secret key
const identity = Secp256k1KeyIdentity.fromSecretKey(
  Uint8Array.from(privKey).buffer
);

console.log(identity.getPrincipal().toText());

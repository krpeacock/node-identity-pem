const fs = require("fs");
const Identity = require("@dfinity/identity");
import nacl from "tweetnacl";
import sha256 from "sha256";

const { Secp256k1KeyIdentity, Ed25519PublicKey, Ed25519KeyIdentity } = Identity;

const rawKey = fs
  .readFileSync("test-key.pem")
  .toString()
  .split("-----BEGIN EC PRIVATE KEY-----")[1]
  .replace("-----END EC PRIVATE KEY-----", "")
  .trim();

rawKey;

const rawBuffer = Uint8Array.from(rawKey).buffer;

rawBuffer.byteLength; //?

const privKey = Uint8Array.from(sha256(rawBuffer, { asBytes: true }));
privKey.byteLength; //?

let keypair = nacl.box.keyPair(privKey); //?
keypair.secretKey.byteLength; //?

let secret = nacl.sign.keyPair.fromSeed(keypair.secretKey); //?

Ed25519KeyIdentity.fromSecretKey(secret.secretKey).getPrincipal().toText(); //?

// Initialize an identity from the secret key
const identity = Secp256k1KeyIdentity.fromSecretKey(
  Uint8Array.from(privKey).buffer
);

console.log(identity.getPrincipal().toText());

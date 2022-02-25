const path = require("path");
const fs = require("fs");
const Identity = require("@dfinity/identity");
import sha256 from "sha256";
import * as p12 from "p12-pem";

const { Secp256k1KeyIdentity, Secp256k1PublicKey } = Identity;

const rawKey = fs.readFileSync("test-key.pem").toString();

rawKey;

const rawBuffer = Uint8Array.from(rawKey).buffer;

let view = new DataView(rawBuffer); //?

rawBuffer.byteLength; //?

const privKey = Uint8Array.from(sha256(rawBuffer, { asBytes: true }));

// Initialize an identity from the secret key
const identity = Secp256k1KeyIdentity.fromSecretKey(privKey);

console.log(identity.getPrincipal().toText());

import fs from "fs";
import fetch from "isomorphic-fetch";
import { Secp256k1KeyIdentity } from "@dfinity/identity";
import sha256 from "sha256";
import { createActor } from "./declarations/whoami/index";

// Live IC whoami canister
const canisterId = "ivcos-eqaaa-aaaab-qablq-cai";

const rawKey = fs
  .readFileSync("test-ec-secp256k1-priv-key.pem")
  .toString()
  .replace("-----BEGIN EC PRIVATE KEY-----", "")
  .replace("-----END EC PRIVATE KEY-----", "")
  .trim();

const rawBuffer = Uint8Array.from(rawKey).buffer;

// Convert the pem file to a sha256 hash
const privKey = Uint8Array.from(sha256(rawBuffer, { asBytes: true }));

// Initialize an identity from the secret key
const identity = Secp256k1KeyIdentity.fromSecretKey(
  Uint8Array.from(privKey).buffer
);

const whoami = createActor(canisterId, {
  agentOptions: {
    host: "https://ic0.app",
    fetch,
    identity,
  },
});

whoami.whoami().then((principal) => {
  console.log("Your IC principal is:", principal.toString());
});

const Identity = require("@dfinity/identity");
const hdkey = require("hdkey");
import nacl from "tweetnacl";
import sha256 from "sha256";

const { Secp256k1KeyIdentity, Ed25519PublicKey, Ed25519KeyIdentity } = Identity;

const bip39 = require("bip39");
// const phrase =
//   "sketch unfair chaos festival road tumble point other host green devote reason";

const phrase =
  "early cinnamon crucial teach mobile just toast real rebel around card priority spike aerobic result account marble hero action intact inside elbow wrestle oval";

bip39.mnemonicToSeed(phrase).then((seed) => {
  const root = hdkey.fromMasterSeed(seed);
  const addrnode = root.derive("m/44'/60'/0'/0/0");
  console.log(addrnode);

  // Initialize an identity from the secret key
  const identity = Secp256k1KeyIdentity.fromSecretKey(addrnode.privateKey)
    .getPrincipal()
    .toText(); //?
});

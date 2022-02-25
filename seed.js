const Identity = require("@dfinity/identity");
const hdkey = require("hdkey");
const fs = require("fs");

const { Secp256k1KeyIdentity } = Identity;

const bip39 = require("bip39");

const phrase = fs.readFileSync("seed.txt").toString().trim();

export const identityFromSeed = async (phrase) => {
  const seed = await bip39.mnemonicToSeed(phrase);
  const root = hdkey.fromMasterSeed(seed);
  const addrnode = root.derive("m/44'/223'/0'/0/0");

  return Secp256k1KeyIdentity.fromSecretKey(addrnode.privateKey);
};

identityFromSeed(phrase).then((identity) => {
  console.log(identity.getPrincipal().toString());
});
  

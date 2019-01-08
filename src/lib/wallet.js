var ethUtil = require("ethereumjs-util");
var crypto = require("crypto");
var scryptsy = require("scrypt.js");
var uuid = require("uuid");
var bs58check = require("bs58check");
// var Buffer = require('safe-buffer')

var _typeof =
  typeof Symbol === "function" && typeof Symbol.iterator === "symbol"
    ? function(obj) {
        return typeof obj;
      }
    : function(obj) {
        return obj &&
          typeof Symbol === "function" &&
          obj.constructor === Symbol &&
          obj !== Symbol.prototype
          ? "symbol"
          : typeof obj;
      };

function assert(val, msg) {
  if (!val) {
    throw new Error(msg || "Assertion failed");
  }
}

function decipherBuffer(decipher, data) {
  return Buffer.concat([decipher.update(data), decipher.final()]);
}

var Wallet = function(priv, pub) {
  if (priv && pub) {
    throw new Error(
      "Cannot supply both a private and a public key to the constructor"
    );
  }

  if (priv && !ethUtil.isValidPrivate(priv)) {
    throw new Error(
      "Private key does not satisfy the curve requirements (ie. it is invalid)"
    );
  }

  if (pub && !ethUtil.isValidPublic(pub)) {
    throw new Error("Invalid public key");
  }

  this._privKey = priv;
  this._pubKey = pub;
};

Object.defineProperty(Wallet.prototype, "privKey", {
  get: function() {
    assert(this._privKey, "This is a public key only wallet");
    return this._privKey;
  }
});

Object.defineProperty(Wallet.prototype, "pubKey", {
  get: function() {
    if (!this._pubKey) {
      this._pubKey = ethUtil.privateToPublic(this.privKey);
    }
    return this._pubKey;
  }
});

Wallet.generate = function(icapDirect) {
  if (icapDirect) {
    while (true) {
      var privKey = crypto.randomBytes(32);
      if (ethUtil.privateToAddress(privKey)[0] === 0) {
        return new Wallet(privKey);
      }
    }
  } else {
    return new Wallet(crypto.randomBytes(32));
  }
};

Wallet.generateVanityAddress = function(pattern) {
  if (typeof pattern !== "object") {
    pattern = new RegExp(pattern);
  }

  while (true) {
    var privKey = crypto.randomBytes(32);
    var address = ethUtil.privateToAddress(privKey);

    if (pattern.test(address.toString("hex"))) {
      return new Wallet(privKey);
    }
  }
};

Wallet.prototype.getPrivateKey = function() {
  return this.privKey;
};

Wallet.prototype.getPrivateKeyString = function() {
  return ethUtil.bufferToHex(this.getPrivateKey());
};

Wallet.prototype.getPublicKey = function() {
  return this.pubKey;
};

Wallet.prototype.getPublicKeyString = function() {
  return ethUtil.bufferToHex(this.getPublicKey());
};

Wallet.prototype.getAddress = function() {
  return ethUtil.publicToAddress(this.pubKey);
};

Wallet.prototype.getAddressString = function() {
  return ethUtil.bufferToHex(this.getAddress());
};

Wallet.prototype.getChecksumAddressString = function() {
  return ethUtil.toChecksumAddress(this.getAddressString());
};

Wallet.prototype.getV3Filename = function(timestamp) {
  var ts = timestamp ? new Date(timestamp) : new Date();
  return [
    "UTC--",
    ts.toJSON().replace(/:/g, "-"),
    "--",
    this.getAddress().toString("hex")
  ].join("");
};

// https://github.com/ethereum/wiki/wiki/Web3-Secret-Storage-Definition
Wallet.prototype.toV3 = function(password, opts) {
  assert(this._privKey, "This is a public key only wallet");

  opts = opts || {};
  var salt = opts.salt || crypto.randomBytes(32);
  var iv = opts.iv || crypto.randomBytes(16);

  var derivedKey;
  var kdf = opts.kdf || "scrypt";
  var kdfparams = {
    dklen: opts.dklen || 32,
    salt: salt.toString("hex")
  };

  if (kdf === "pbkdf2") {
    kdfparams.c = opts.c || 262144;
    kdfparams.prf = "hmac-sha256";
    derivedKey = crypto.pbkdf2Sync(
      new Buffer(password),
      salt,
      kdfparams.c,
      kdfparams.dklen,
      "sha256"
    );
  } else if (kdf === "scrypt") {
    // FIXME: support progress reporting callback
    kdfparams.n = opts.n || 262144;
    kdfparams.r = opts.r || 8;
    kdfparams.p = opts.p || 1;
    derivedKey = scryptsy(
      new Buffer(password),
      salt,
      kdfparams.n,
      kdfparams.r,
      kdfparams.p,
      kdfparams.dklen
    );
  } else {
    throw new Error("Unsupported kdf");
  }

  var cipher = crypto.createCipheriv(
    opts.cipher || "aes-128-ctr",
    derivedKey.slice(0, 16),
    iv
  );
  if (!cipher) {
    throw new Error("Unsupported cipher");
  }

  var ciphertext = Buffer.concat([cipher.update(this.privKey), cipher.final()]);

  var mac = ethUtil.sha3(
    Buffer.concat([derivedKey.slice(16, 32), new Buffer(ciphertext, "hex")])
  );

  return {
    version: 3,
    id: uuid.v4({ random: opts.uuid || crypto.randomBytes(16) }),
    address: this.getAddress().toString("hex"),
    crypto: {
      ciphertext: ciphertext.toString("hex"),
      cipherparams: {
        iv: iv.toString("hex")
      },
      cipher: opts.cipher || "aes-128-ctr",
      kdf: kdf,
      kdfparams: kdfparams,
      mac: mac.toString("hex")
    }
  };
};

Wallet.prototype.getV3Filename = function(timestamp) {
  /*
   * We want a timestamp like 2016-03-15T17-11-33.007598288Z. Date formatting
   * is a pain in Javascript, everbody knows that. We could use moment.js,
   * but decide to do it manually in order to save space.
   *
   * toJSON() returns a pretty close version, so let's use it. It is not UTC though,
   * but does it really matter?
   *
   * Alternative manual way with padding and Date fields: http://stackoverflow.com/a/7244288/4964819
   *
   */
  var ts = timestamp ? new Date(timestamp) : new Date();

  return [
    "UTC--",
    ts.toJSON().replace(/:/g, "-"),
    "--",
    this.getAddress().toString("hex")
  ].join("");
};

Wallet.prototype.toV3String = function(password, opts) {
  return JSON.stringify(this.toV3(password, opts));
};

Wallet.fromPublicKey = function(pub, nonStrict) {
  if (nonStrict) {
    pub = ethUtil.importPublic(pub);
  }
  return new Wallet(null, pub);
};

Wallet.fromExtendedPublicKey = function(pub) {
  assert(pub.slice(0, 4) === "xpub", "Not an extended public key");
  pub = bs58check.decode(pub).slice(45);
  // Convert to an Ethereum public key
  return Wallet.fromPublicKey(pub, true);
};

Wallet.fromPrivateKey = function(priv) {
  return new Wallet(priv);
};

Wallet.fromExtendedPrivateKey = function(priv) {
  assert(priv.slice(0, 4) === "xprv", "Not an extended private key");
  var tmp = bs58check.decode(priv);
  assert(tmp[45] === 0, "Invalid extended private key");
  return Wallet.fromPrivateKey(tmp.slice(46));
};

// https://github.com/ethereum/go-ethereum/wiki/Passphrase-protected-key-store-spec
Wallet.fromV1 = function(input, password) {
  assert(typeof password === "string");
  var json = typeof input === "object" ? input : JSON.parse(input);

  if (json.Version !== "1") {
    throw new Error("Not a V1 wallet");
  }

  if (json.Crypto.KeyHeader.Kdf !== "scrypt") {
    throw new Error("Unsupported key derivation scheme");
  }

  var kdfparams = json.Crypto.KeyHeader.KdfParams;
  var derivedKey = scryptsy(
    new Buffer(password),
    new Buffer(json.Crypto.Salt, "hex"),
    kdfparams.N,
    kdfparams.R,
    kdfparams.P,
    kdfparams.DkLen
  );

  var ciphertext = new Buffer(json.Crypto.CipherText, "hex");

  var mac = ethUtil.sha3(Buffer.concat([derivedKey.slice(16, 32), ciphertext]));

  if (mac.toString("hex") !== json.Crypto.MAC) {
    throw new Error("Key derivation failed - possibly wrong passphrase");
  }

  var decipher = crypto.createDecipheriv(
    "aes-128-cbc",
    ethUtil.sha3(derivedKey.slice(0, 16)).slice(0, 16),
    new Buffer(json.Crypto.IV, "hex")
  );
  var seed = decipherBuffer(decipher, ciphertext);

  return new Wallet(seed);
};

Wallet.fromV3 = function(input, password, nonStrict) {
  assert(typeof password === "string");
  var json =
    typeof input === "object"
      ? input
      : JSON.parse(nonStrict ? input.toLowerCase() : input);
  // console.log(input)
  // console.log(password)
  if (json.version !== 3) {
    throw new Error("Not a V3 wallet");
  }

  var derivedKey;
  var kdfparams;
  if (json.crypto.kdf === "scrypt") {
    kdfparams = json.crypto.kdfparams;

    // FIXME: support progress reporting callback
    derivedKey = scryptsy(
      new Buffer(password),
      new Buffer(kdfparams.salt, "hex"),
      kdfparams.n,
      kdfparams.r,
      kdfparams.p,
      kdfparams.dklen
    );
  } else if (json.crypto.kdf === "pbkdf2") {
    kdfparams = json.crypto.kdfparams;

    if (kdfparams.prf !== "hmac-sha256") {
      throw new Error("Unsupported parameters to PBKDF2");
    }

    derivedKey = crypto.pbkdf2Sync(
      new Buffer(password),
      new Buffer(kdfparams.salt, "hex"),
      kdfparams.c,
      kdfparams.dklen,
      "sha256"
    );
  } else {
    throw new Error("Unsupported key derivation scheme");
  }

  var ciphertext = new Buffer(json.crypto.ciphertext, "hex");

  var mac = ethUtil.sha3(Buffer.concat([derivedKey.slice(16, 32), ciphertext]));
  if (mac.toString("hex") !== json.crypto.mac) {
    throw new Error("Key derivation failed - possibly wrong passphrase");
  }

  var decipher = crypto.createDecipheriv(
    json.crypto.cipher,
    derivedKey.slice(0, 16),
    new Buffer(json.crypto.cipherparams.iv, "hex")
  );
  var seed = decipherBuffer(decipher, ciphertext, "hex");
  while (seed.length < 32) {
    var nullBuff = new Buffer([0x00]);
    seed = Buffer.concat([nullBuff, seed]);
  }
  return new Wallet(seed);
};

/*
 * Based on https://github.com/ethereum/pyethsaletool/blob/master/pyethsaletool.py
 * JSON fields: encseed, ethaddr, btcaddr, email
 */
Wallet.fromEthSale = function(input, password) {
  assert(typeof password === "string");
  var json = typeof input === "object" ? input : JSON.parse(input);
  var encseed = new Buffer(json.encseed, "hex");
  // key derivation
  var derivedKey = crypto
    .pbkdf2Sync(password, password, 2000, 32, "sha256")
    .slice(0, 16);
  // seed decoding (IV is first 16 bytes)
  // NOTE: crypto (derived from openssl) when used with aes-*-cbc will handle PKCS#7 padding internally
  //       see also http://stackoverflow.com/a/31614770/4964819
  var decipher = crypto.createDecipheriv(
    "aes-128-cbc",
    derivedKey,
    encseed.slice(0, 16)
  );
  var seed = decipherBuffer(decipher, encseed.slice(16));
  var wallet = new Wallet(ethUtil.sha3(seed));
  if (wallet.getAddress().toString("hex") !== json.ethaddr) {
    throw new Error("Decoded key mismatch - possibly wrong passphrase");
  }
  return wallet;
};

Wallet.fromMyEtherWallet = function(input, password) {
  var json =
    (typeof input === "undefined" ? "undefined" : _typeof(input)) === "object"
      ? input
      : JSON.parse(input);
  var privKey;
  if (!json.locked) {
    if (json.private.length !== 64) {
      throw new Error("Invalid private key length");
    }
    privKey = new Buffer(json.private, "hex");
  } else {
    if (typeof password !== "string") {
      throw new Error("Password required");
    }
    if (password.length < 7) {
      throw new Error("Password must be at least 7 characters");
    }
    var cipher = json.encrypted ? json.private.slice(0, 128) : json.private;
    cipher = Wallet.decodeCryptojsSalt(cipher);
    var evp = Wallet.evp_kdf(new Buffer(password), cipher.salt, {
      keysize: 32,
      ivsize: 16
    });
    var decipher = ethUtil.crypto.createDecipheriv(
      "aes-256-cbc",
      evp.key,
      evp.iv
    );
    privKey = Wallet.decipherBuffer(decipher, new Buffer(cipher.ciphertext));
    privKey = new Buffer(privKey.toString(), "hex");
  }
  var wallet = new Wallet(privKey);
  if (wallet.getAddressString() !== json.address) {
    throw new Error("Invalid private key or address");
  }
  return wallet;
};

Wallet.decodeCryptojsSalt = function(input) {
  var ciphertext = new Buffer(input, "base64");
  if (ciphertext.slice(0, 8).toString() === "Salted__") {
    return {
      salt: ciphertext.slice(8, 16),
      ciphertext: ciphertext.slice(16)
    };
  } else {
    return {
      ciphertext: ciphertext
    };
  }
};

Wallet.evp_kdf = function(data, salt, opts) {
  // A single EVP iteration, returns `D_i`, where block equlas to `D_(i-1)`

  function iter(block) {
    var hash = ethUtil.crypto.createHash(opts.digest || "md5");
    hash.update(block);
    hash.update(data);
    hash.update(salt);
    block = hash.digest();
    for (var i = 1; i < (opts.count || 1); i++) {
      hash = ethUtil.crypto.createHash(opts.digest || "md5");
      hash.update(block);
      block = hash.digest();
    }
    return block;
  }
  var keysize = opts.keysize || 16;
  var ivsize = opts.ivsize || 16;
  var ret = [];
  var i = 0;
  while (Buffer.concat(ret).length < keysize + ivsize) {
    ret[i] = iter(i === 0 ? new Buffer(0) : ret[i - 1]);
    i++;
  }
  var tmp = Buffer.concat(ret);
  return {
    key: tmp.slice(0, keysize),
    iv: tmp.slice(keysize, keysize + ivsize)
  };
};

Wallet.fromMyEtherWalletV2 = function(input) {
  var json =
    (typeof input === "undefined" ? "undefined" : _typeof(input)) === "object"
      ? input
      : JSON.parse(input);
  if (json.privKey.length !== 64) {
    throw new Error("Invalid private key length");
  }
  var privKey = new Buffer(json.privKey, "hex");
  return new Wallet(privKey);
};

Wallet.getWalletFromPrivKeyFile = function(strjson, password) {
  var jsonArr = JSON.parse(strjson);
  if (jsonArr.encseed != null) {
    // console.log(1)
    return Wallet.fromEthSale(strjson, password);
  } else if (jsonArr.Crypto != null || jsonArr.crypto != null) {
    // console.log(2)
    return Wallet.fromV3(strjson, password, true);
  } else if (jsonArr.hash != null) {
    // console.log(3)
    return Wallet.fromMyEtherWallet(strjson, password);
  } else if (jsonArr.publisher === "MyEtherWallet") {
    // console.log(4)
    return Wallet.fromMyEtherWalletV2(strjson);
  } else {
    throw "Sorry! We don't recognize this type of wallet file. ";
  }
};

Wallet.requirePass = ethjson => {
  let jsonArr;
  try {
    jsonArr = JSON.parse(ethjson);
  } catch (err) {
    throw "This is not a valid wallet file. ";
  }
  if (jsonArr.encseed != null) {
    return true;
  } else if (jsonArr.Crypto != null || jsonArr.crypto != null) {
    return true;
  } else if (jsonArr.hash != null && jsonArr.locked) {
    return true;
  } else if (jsonArr.hash != null && !jsonArr.locked) {
    return false;
  } else if (jsonArr.publisher == "MyEtherWallet" && !jsonArr.encrypted) {
    return false;
  } else {
    throw 'Sorry! We don"t recognize this type of wallet file. ';
  }
};

// module.exports = Wallet
export default Wallet;

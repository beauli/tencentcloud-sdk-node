const debug = require('debug')('tencentcloud-sdk-node:sign');
const crypto = require('crypto');
const util = require('util')


function sign (secretId, secretKey, params, fnProcessRequestString) {
  params.SecretId = secretId
  if (!params.Timestamp) {
    params.Timestamp = Math.round(Date.now() / 1000)
  }
  if (!params.Nonce) {
    params.Nonce = Math.round(Math.random() * 65535)
  }
  const keys = [];
  for (var key in params) {
    keys.push(key);
  }
  keys.sort();

  let str = ''
  keys.forEach(key => {
    let value = params[key];
    if (Object.prototype.toString.call(value) !== '[object String]') {
      value = JSON.stringify(value);
    }

    str += util.format('&%s=%s', key, value);
  });
  str = str.substring(1)

  if (fnProcessRequestString) {
    str = fnProcessRequestString(str)
  }
  debug('sign str:', str)
  let hashed = hmac(secretKey, str);
  debug('sign hash', hashed);

  return hashed
}


function hmac (key, content) {
  return crypto.createHmac('sha1', key).update(content).digest('base64')
}

module.exports = { sign }
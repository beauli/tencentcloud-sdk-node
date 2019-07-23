const signHelper = require('./signHelper')
const debug = require('debug')('tencentcloud-sdk-node:rpcclient');
const fetch = require('node-fetch')
const url = require('url')
const querystring = require('querystring')


class RpcClient {
  /**
   * 
   * @param {Object} config 
   * @param {String} config.SecretId
   * @param {String} config.SecretKey
   * @param {String} config.Version
   * @param {String} config.BaseUrl
   */
  constructor(config) {
    if (!config.SecretId || !config.SecretKey) {
      throw new Error('SecretId and SecretKey must input')
    }
    debug('config', config)
    this.config = Object.assign({ BaseUrl: 'https://cvm.tencentcloudapi.com', Version: '2017-03-12' }, config)
    this.baseUrl = url.parse(config.BaseUrl)
  }

  /**
   * request
   * @param {String} action 
   * @param {Object} data 
   */
  async request (action, data) {
    data.Action = action
    data.Version = this.config.Version
    const signature = signHelper.sign(this.config.SecretId, this.config.SecretKey, data, (str) => {
      return `POST${this.baseUrl.host}/?` + str
    })
    const postData = Object.assign({ Signature: signature }, data)
    debug('post data', postData)
    const resp = await fetch(this.config.BaseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: querystring.stringify(postData)
    })
    return resp.json()
  }
}

module.exports = { RpcClient }
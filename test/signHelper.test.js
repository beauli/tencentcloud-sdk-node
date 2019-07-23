const signHelper = require('./../lib/signHelper')
const crypto = require('crypto')
describe('sign helper test', () => {
  it('# sign', () => {
    
    const publicKey = 'AKIDz8krbsJ5yKBZQpn74WFkmLPx3EXAMPLE'
    const privateKey = 'Gu5t9xGARNpq86cd98joQYCN3EXAMPLE'
    
    const data = {
      'Action': 'DescribeInstances',
      'InstanceIds.0': 'ins-09dx96dg',
      'Limit': 20,
      'Nonce': 11886,
      'Offset': 0,
      'Region': 'ap-guangzhou',
      'SecretId': 'AKIDz8krbsJ5yKBZQpn74WFkmLPx3EXAMPLE',
      'Timestamp': 1465185768,
      'Version': '2017-03-12',
    }

    const signature = signHelper.sign(publicKey, privateKey, data, function (str) {
      return 'GETcvm.tencentcloudapi.com/?'+str
    })
    expect(signature).toBe('EliP9YW3pW28FpsEdkXt/+WcGeI=')

  })
})
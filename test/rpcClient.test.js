const { RpcClient } = require('./../lib/rpcClient')

describe('rpc client test', () => {
  const client = new RpcClient({
    SecretId: process.env.TENCENTCLOUD_SECRETID,
    SecretKey: process.env.TENCENTCLOUD_SECRETKEY,
    Version: '2017-03-12',
    BaseUrl: 'https://cvm.tencentcloudapi.com'
  })
  it('# get region', async () => {
    const result = await client.request('DescribeRegions', {})
    console.log(JSON.stringify(result, null, 2))
  })
})
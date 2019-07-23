# tencentcloud-sdk-node

tencentcloud nodejs sdk https://cloud.tencent.com/document/api/213/15689

## sample

```javascript
const { RpcClient } = require("./");
const client = new RpcClient({
  SecretId: "xxxx",
  SecretKey: "xxx",
  Version: "2017-03-12",
  BaseUrl: "https://cvm.tencentcloudapi.com"
});
const result = await client.request("DescribeRegions", {});
console.log(result);
```

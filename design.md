# 设计

其实每种类型都需要特定的格式，这格式就是生成规则，找到规律，就可以很方便的生成和反生成

```js
// parse
// stringify
// rules
// wrap

- 要跳转的目标不同，输入数据的要求不同
- 在不同的场景配置，输出的格式也不同
- 根据配置场景以及跳转目标，对应的规则如下：
  - 第一步：配置目标地址所需要的数据，获取数据，输出 miniObj 对象
    - appId path pageQuery bizParams webviewUrl
    - => mini // 小程序链接
  - 第二步：选择要配置的场景，计算转换到目标地址的规则过程
    - aliapp
      - => mini
        - `pages/${path}/${path}?${stringify(pageQuery, bizParams)}`
      - tplmsg-mini // 支付宝模板消息 -> 支付宝小程序
        - `pages/${path}/${path}?${stringify(pageQuery, bizParams)}`
      - life-mini // 支付宝生活号 -> 支付宝小程序
        - `pages/${path}/${path}?${stringify(pageQuery, bizParams)}`
      - h5-mini // 生活号 -> 支付宝小程序
        - => mini => alipays
        - `alipays://platformapi/startApp?appId=${appId}&page=${mini.toString()}`
      - sms-mini // 短信 -> 支付宝小程序
        - => mini => alipays => h5
        - `https://ds.alipay.com/?from=mobilecodec&scheme=${alipays.scheme}`
      - mini-mini // 小程序间跳转
        - `miniapp://pages/${path}/${path}?${stringify(pageQuery, bizParams)}`
    - wxapp
      - mp-mini // 公众号 -> 微信小程序
        - => mini => mp
        - `pages/${path}/${path}?${stringify(pageQuery, bizParams)}`
      - tweet-mini // 推文 -> 微信小程序
        - `pages/${path}/${path}.html?${stringify(pageQuery, bizParams)}`
      - ad-mini // 广告投放 -> 微信小程序
        - `/pages/${path}/${path}?${stringify(pageQuery, bizParams)}`
      - tplmsg-mini
        - `/pages/${path}/${path}?${stringify(pageQuery, bizParams)}`
      - mini-mini // 小程序间跳转
        - `miniapp://pages/${path}/${path}?${stringify(pageQuery, bizParams)}`

// alipays
const alipays = {
  h5: `https://ds.alipay.com/?from=mobilecodec&scheme=${alipays.scheme}`,
  scheme: `alipays://platformapi/startApp?appId=${appId}&page=${miniapp.toString()}`,
}

{
  input: {
    appId: '',
    path: '',
    pageQuery: {

    },
    bizParams: {

    },
  },
  output: '',
}
```

path: 'topic',
pageQuery: 'id=xxx&url=xxx',
topicUrl: '',

端标识:

rules:

```js
const hsqH5 = {
  url: ``,
  pathname: '/detail',
  page: 'detail',
  pageQuery: {},
  bizParams: {},
  toString() {
    const origin = `https://topic.doweidu.com`;
    const { pathname, pageQuery } = this;
    return `${origin}${pathname}?${stringify(pageQuery, bizParams)}`;
  },
};
// 支持配置页面路径，页面参数，环境域以及渠道参数
const topicH5 = {
  zt: ``,
  wf: ``,
  pathname: '/detail',
  page: 'detail',
  pageQuery: {},
  bizParams: {},
  toString() {
    const origin = `https://topic.doweidu.com`;
    const { pathname, pageQuery } = this;
    return `${origin}${pathname}?${stringify(pageQuery, bizParams)}`;
  },
};
// miniapp
const miniapp = {
  url: ``,
  pathname: 'pages/detail/detail',
  page: 'detail',
  pageQuery: {},
  bizParams: {},
  toString(prefix = '') {
    const { pathname, pageQuery, bizParams } = this;
    return `${prefix}${pathname}?${stringify(pageQuery, bizParams)}`;
  },
};

```

需要支持

- alipays schemaURL:
  - alipays://platformapi/startApp?appId=2017112000051610&page=pages%2Ftopic%2Ftopic%3Fid%3Dxxx%26url%3Dhttps%253A%252F%252Ftopic.doweidu.com%252F%253F%253Dxxx%2526d_aliapp%253D1
  - alipays://platformapi/startApp?appId=2017112000051610&page=pages%2Fdetail%2Fdetail%3Fid%3Dxxx
- aliapys h5:
  - https://ds.alipay.com/?from=mobilecodec&scheme=alipays%3A%2F%2Fplatformapi%2FstartApp%3FappId%3D2017112000051610%26page%3Dpages%252Fdetail%252Fdetail%253Fid%253Dxxx
- pages/detail/detail?id=xxx
- miniapp://pages/detail/detail?appid=2017112000051610&id=xxx
- h5: https://m.haoshiqi.net/detail?id=xxx

- 微信推文
  - pages/topic/topic.html?spm=xxx&url=https%3A%2F%2Ftopic.doweidu.com%2F%3Fid%3D8b0c1801400d8118263f2974a4330aeb%26origin%3Dhsq_wxmp
- 微信广告投放 /pages/topic/topic?spm=wxapp/xgjxx&url=https%3A%2F%2Ftopic.doweidu.com%2F%3Fid%3D8b0c1801400d8118263f2974a4330aeb%26origin%3Dhsq_wxmp%26d_wxapp%3D1
  - 微信广告投放文档：https://wximg.qq.com/wxp/pdftool/get.html?id=BkPmceLSG&pa=5&name=miniprogram_conv

目标 URL

- 支付宝小程序 alipays 链接
- 支付宝小程序 模板消息链接
- 支付宝短信链接 https 格式
- 小程序间跳转
- 微信扫码跳转格式

解析输出 url 各种字段，host、path、query，hash 等
转换规则
生成目标

关系图，是否支持生成

注意事项
以下测试要以真机结果为准

支付宝小程序
!!!如果当前已经打开蚂蚁会员小程序，在钉钉跳转到积分小程序，触发两次这个App 的 onShow();
第一次为从后台切到前台，参数为空
第二次为schema唤醒，传入参数
支付宝 schema 传参在 options.query 这里取
alipay://platformapi/startApp?appId=2018051160096372&query=channel_id%3Dalipay_ant
alipays://platformapi/startApp?appId=2017112000051610&query=spm%3D222%26channel%3D333%26channel_id%3Dpoint&page=pages%2Findex%2Findex%3Fid%3D111
参数结构如下,默认扫码(打开scene为四个0，小程序列表打开为 1001，无 query)
options = { path: 'pages/index/index', query: { channel: 333, channel_id: 'point', spm: '222' }, scene: '0000' }

支付宝小程序间跳转，参数在 referrerInfo 中，结构如下：
options = { path: 'pages/index/index', scene: '1037', referrerInfo: { appId: '来源的 appId,如2018051160096372', extraData: { channel_id: '', spm: '', refer: '来源页面,如pages/profile/profile' } } };
my.alert({
  title: 'onShow:' + JSON.stringify(options),
});

微信小程序
options = { path: 'pages/index/index', query: {}, referrerInfo: {}, scene: 1001, shareTicket: undefined }



sheng

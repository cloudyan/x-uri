// 解析 url 为一个深度对象

// 尽可能的全面正确的解析一个任意 url 的所有参数为 Object，注意边界条件的处理。

/* 示例
let url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled';
parseParam(url)

{ user: 'anonymous',
  id: [ 123, 456 ], // 重复出现的 key 要组装成数组，能被转成数字的就转成数字类型
  city: '北京', // 中文需解码
  enabled: true, // 未指定值得 key 约定为 true
}

alipays://platformapi/startApp?appId=2017112000051610&query=spm%3Dhuabei&page=pages%2Fdetail%2Fdetail%3Fid%3Dxxx
miniapp://pages/detail/detail?appid=2018051160096372&id=xxx&spm=huabei

https://ds.alipay.com/?from=mobilecodec&scheme=alipays%3A%2F%2Fplatformapi%2FstartApp%3FappId%3D2018051160096372%26query%3Dspm%253Dhuabei%26page%3Dpages%252Fdetail%252Fdetail%253Fid%253Dxxx

pages/detail/detail?id=xxx&spm=huabei

alipays://platformapi/startApp?appId=2017112000051610&query=spm%3Dhuabei&page=pages%2Ftopic%2Ftopic%3Fid%3Dxxx%26url%3Dhttps%253A%252F%252Ftopic.doweidu.com%252F%253Fid%253D6633dc9c5148b8d7a5057bc85d80c922%2526d_aliapp%253D1

alipays://platformapi/startApp?appId=2017112000051610&query=spm%3Dhuabei%26channel_id%3Dalipay_ant&page=pages%2Ftopic%2Ftopic%3Fid%3Dxxx%26url%3Dhttps%253A%252F%252Ftopic.doweidu.com%252F%253Fid%253D6633dc9c5148b8d7a5057bc85d80c922%2526d_aliapp%253D1

alipays://platformapi/startApp?appId=2017112000051610&query=spm%3Dhuabei&page=pages%2Findex%2Findex%3Fjumplink%3Dtopic%253Fid%253Dxxx%26minishare%3D1%26url%3Dhttps%253A%252F%252Ftopic.doweidu.com%252F%253Fid%253D6633dc9c5148b8d7a5057bc85d80c922%2526d_aliapp%253D1


https://ds.alipay.com/?from=mobilecodec&scheme=alipays%3A%2F%2Fplatformapi%2FstartApp%3FappId%3D2017112000051610%26query%3Dspm%253Dhuabei%26page%3Dpages%252Findex%252Findex%253Fjumplink%253Dtopic%25253Fid%25253Dxxx%2526minishare%253D1%2526url%253Dhttps%25253A%25252F%25252Ftopic.doweidu.com%25252F%25253Fid%25253D6633dc9c5148b8d7a5057bc85d80c922%252526d_aliapp%25253D1

*/

// _.get()

function parse(url) {
  const obj = {};

  return obj;
}

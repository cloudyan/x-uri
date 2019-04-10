/**
 * 深度解析 url 为一个对象
 * 不仅要解析 url 还要解析参数
 *
 * 有些恶心的第三方App，不判断当前的url参数，
 * 就直接在域名路径后加自己的参数，导致URL不规范错误，无法常规处理了
 * https://m.iqianggou.com/?from=singlemessage&isappinstalled=0#bargain?id=646156&platform=5
 *
 * @export
 */
export default function parseUrl(url) {
  if (!url) return;

  const obj = {};

  // 处理不符合 search 参数格式的情况
  url = url[0] !== '?' ? '?' + url : url;
  // 处理异常参数，如多个 ?
  url = url.replace(/\?/g, '&').replace('&', '?');


  return obj;
}


// 尽可能的全面正确的解析一个任意 url 的所有参数为 Object，注意边界条件的处理。

/* 示例
let url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled';
parseParam(url)

{ user: 'anonymous',
  id: [ 123, 456 ], // 重复出现的 key 要组装成数组，能被转成数字的就转成数字类型
  city: '北京', // 中文需解码
  enabled: true, // 未指定值得 key 约定为 true
}

function parseParam(url) {
  const paramsStr = /.+\?(.+)$/.exec(url)[1]; // 将 ? 后面的字符串取出来
  const paramsArr = paramsStr.split('&'); // 将字符串以 & 分割后存到数组中
  let paramsObj = {};
  // 将 params 存到对象中
  paramsArr.forEach(param => {
    if (/=/.test(param)) { // 处理有 value 的参数
      let [key, val] = param.split('='); // 分割 key 和 value
      val = decodeURIComponent(val); // 解码
      val = /^\d+$/.test(val) ? parseFloat(val) : val; // 判断是否转为数字

      if (paramsObj.hasOwnProperty(key)) { // 如果对象有 key，则添加一个值
        paramsObj[key] = [].concat(paramsObj[key], val);
      } else { // 如果对象没有这个 key，创建 key 并设置值
        paramsObj[key] = val;
      }
    } else { // 处理没有 value 的参数
      paramsObj[param] = true;
    }
  })

  return paramsObj;
}


import copy from './copy';

/**
 * parse 解析url
 *
 * 有些恶心的第三方App，不判断当前的url参数，
 * 就直接在域名路径后加自己的参数，导致URL不规范错误，无法常规处理了
 * https://m.iqianggou.com/?from=singlemessage&isappinstalled=0#bargain?id=646156&platform=5
 *
 * @export
 */

const searchReg = /([^&=?#]+)=([^&#]+)/g;
const urlReg = /\/+.*\?/;
const arrayReg = /(.+)\[\]$/;

function parse(url, key) {
  if (!url) return;

  const params = {};
  let match;
  let name;
  let value;
  let isArray;

  // 处理不符合 search 参数格式的情况
  url = url[0] !== '?' ? '?' + url : url;
  // 处理异常参数，如多个 ?
  url = url.replace(/\?/g, '&').replace('&', '?');

  /* eslint prefer-destructuring: 0 */
  while ((match = searchReg.exec(url))) {
    name = match[1];
    value = match[2];
    isArray = name.match(arrayReg);
    // 处理参数为url这种情况
    if (urlReg.test(value)) {
      params[name] = url.substr(url.indexOf(value));
      break;
    }
    if (isArray) {
      name = isArray[1];
      params[name] = params[name] || [];
      params[name].push(value);
    } else {
      params[name] = value;
    }
  }

  return key ? copy(params[key]) : copy(params);
}

// console.log(parse('id=xx&c=xx'))

export default parse;


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

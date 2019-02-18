import Vue from "vue"

export function randomWord(randomFlag, min, max) {
  let str = "",
    pos = '',
    range = min,
    arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  // 随机产生
  if (randomFlag) {
    range = Math.round(Math.random() * (max - min)) + min;
  }
  for (var i = 0; i < range; i++) {
    pos = Math.round(Math.random() * (arr.length - 1));
    str += arr[pos];
  }
  return str;
}
export function getDate(tm) {
  var timestamp = Date.parse(new Date(tm));
  return timestamp = timestamp / 1000;
}

// 获取后缀名
export const suffix = (file) => {
  let Suffix = file.substring(0, file.lastIndexOf('.'));
  return Suffix
}

// 时间转换秒数
export const formatTime = (timeTemp) => {
  let m = Math.floor(timeTemp / 60);
  let s = Math.floor(timeTemp % 60);
  return (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
}

// 时间戳转时间格式
export const getLocalTime = (nS) => {
  return new Date(parseInt(nS) * 1000).toLocaleString('chinese', {
    hour12: false
  }).replace(/\//g, '-');
}

// 判断是否是纯数字
export const isIntNumber = (val) => {
  let reg = /^[1-9]\d*$|^0$/;
  let formal = String(val).match(reg);
  return formal;
};

// 判断是否是纯数字并且有小数点
export const isFloatNumber = (val) => {
  let reg = /^([1-9][0-9]*|0)(\.[0-9]+)?$/;
  let formal = String(val).match(reg);
  return formal;
};

// 判断邮箱格式
export const isEmail = (val) => {
  let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
  let formal = reg.test(val);
  return formal;
};

// 判断是否在微信, http://www.xajianzhan.com/show/54.html
export const isWechat = /(micromessenger|webbrowser)/.test(navigator.userAgent.toLocaleLowerCase())

// 判断是否手机端
export const isPhone = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)

// 存储当前历史记录点,实现控制手机物理返回键的按钮事件
export const pushHistory = () => {
  let state = {
    title: '',
    url: ''
  }
  window.history.pushState(state, state.title, state.url)
}

// 生成带有前端路由信息的普通链接
export function getRouterLink() {
  let urlParams = new URLSearchParams(window.location.search.slice(1))
  if (urlParams.has('path')) {
    urlParams.delete('path')
  }
  urlParams.append('path', window.location.hash.substr(1))

  let link = window.location.origin + window.location.pathname + '?' + urlParams.toString() + location.hash
  return link
}

export const apiOrigin = 'https://match.cugtrip.com'
const hrefLink = getRouterLink()
// 生成带有前端路由信息的普通链接
export function wechatOauth() {
  // ${location.href}
  // window.location = `${apiOrigin}/wechat/mock?id=2?redirect=${hrefLink}`  //模拟用户
  window.location = `${apiOrigin}/wechat/login?redirect=${hrefLink}`
  return
}

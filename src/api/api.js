import axios from 'axios'
import http from './http'

export function getWeixinJsSdkConfig(apis = []) {
  let location_href = encodeURIComponent(window.location.href.split('#')[0])
  //  debug 调试
  // let url = `/wechat/jssdk?debug&url=${location_href}&${
  //     apis.map(api_name => `jsApiList[]=${api_name}`).join("&") }`
  // 正式环境
  let url = `/wechat/jssdk?url=${location_href}&${
    apis.map(api_name => `jsApiList[]=${api_name}`).join("&")}`
  return http.get(url).then(res => {
    return res.data;
  })
}

//报名
// export function PostEnroll(params) {
//   const url = "/enrolls"
//   return http.post(url, params)
// }
export const PostEnroll = params => http.post(`/enrolls`, params)
// 获取选手列表
export const getLists = params => http.get(`/api/lists`, params)
// 获取选手详情
export const getVoteDetail = params => http.get(`/api/get`, params)
// 投票
export const postVote = params => http.post(`/api/votes`, params)

// 清空剩余投票
export const clearVote = _=> http.get(`/api/clear-votes`)



/* Created by tommyZZM.OSX on 2018/5/19. */
// "use strict";
// import * as R from "ramda"
import Vue from 'vue'
import {
    getWeixinJsSdkConfig
} from "../api/api";
import {
    getRouterLink
} from './common'
import {
    WechatPlugin
} from 'vux'

Vue.use(WechatPlugin); //  微信
const wx = Vue.wechat;


export const weixinJsSDKAuth = new Promise((resolve) => {
    let timeout = setTimeout(function() {
        console.info("微信JSSDK授权验证等待 10s 超时, 可能不在微信环境");
        clearTimeout(timeout);
        resolve(false);
    }, 10000);

    wx.ready(_ => {
        clearTimeout(timeout);
        resolve(true)
    });
    wx.error(function(res) {
        clearTimeout(timeout);
        console.error("微信JSSDK授权验证失败: ", res);
        resolve(false);
    });

    (
        window._jssdk_config ?
        Promise.resolve(window._jssdk_config) :
        (getWeixinJsSdkConfig(['onMenuShareTimeline', 'onMenuShareAppMessage', 'chooseWXPay']))
    ).then(config => {
        console.log('微信JSSDK授权信息: ', config)
        wx.config(config || {});
    });
})

// const wx_share_img = require('../assets/img/head.jpg');

// const wx_share_img = 'http://txh-cdn.96qbhy.com/201809291732149tvOlSvU.png'  //上传到七牛云了,风景图
const wx_share_img = 'http://txh-cdn.96qbhy.com/20180929175605wOdcmdBB.png' //上传到七牛云了，我爱喀什

export const wxShare = (shareTitle, shareDesc, shareLink, shareImg, shareSuccess) => {
    let options = {
        title: shareTitle || '2018年首届“喀什礼物”旅游商品设计大赛',
        desc: shareDesc || '礼，为喀什代言',
        // link: shareLink || getRouterLink(),
        link: (shareLink || getRouterLink()).replace(/http:\/\//, 'https://'),
        imgUrl: shareImg || wx_share_img,
        success: shareSuccess || (_ => void 0)
    }

    console.log('微信转发参数: ', options)

    weixinJsSDKAuth.then(boo => {
        if (boo) {
            wx.onMenuShareTimeline(options) // 分享到朋友圈
            wx.onMenuShareAppMessage(options) // 分享到朋友
            wx.onMenuShareQQ(options) // 分享到QQ
            wx.onMenuShareQZone(options) // 分享到QQ空间
        }
    })
}

window.wxShare = wxShare;

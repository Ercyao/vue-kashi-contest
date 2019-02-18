// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import axios from 'axios'
import { LoadingPlugin, ToastPlugin, XButton } from 'vux'
// import { LoadingPlugin, ToastPlugin, XButton } from 'vux'
import VueLazyload from 'vue-lazyload'
import store from './store' // vuex  store 对象

import './assets/style/reset.less'   //初始化样式
import './assets/font/font.css'

import './assets/style/main.less'


Vue.config.productionTip = false

Vue.prototype.$http = axios
// 组件中使用：
// this.$http.post()
// Vue.prototype 为注册全局方法  其他任何组件都可引用

// Vux 插件
Vue.use(LoadingPlugin);
Vue.use(ToastPlugin);
Vue.use(XButton);


const FastClick = require('fastclick')
FastClick.attach(document.body)

// 图片使用懒加载
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'http://img.tongxinghui.com/img-not-found.svg',
  loading: 'http://img.tongxinghui.com/loading.svg?imageslim',
  attempt: 1
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})


router.beforeEach(function (to, from, next) {
  console.log("切换之前")
  store.commit('updateLoadingStatus', {isLoading: true})
  // 判断该页面是否是投票
  if (from.query.urlType) {
    // 路由切换时，如果没有就添加，有就跳过执行，添加固定参数
    if (!to.query.urlType) {
      // 准备一个跳转的query对象
      let query = to.query
      query.urlType = from.query.urlType
      next({
        path: to.path,
        query: query
      })
    } else {
      next()
    }
  } else {
    next()
  }
  next()
})

router.afterEach(function (to) {
  console.log("切换之后")
  store.commit('updateLoadingStatus', {isLoading: false})
})

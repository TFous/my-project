// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vues from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex/store.js'
import * as auth from './api/auth/auth.js'
import urlAppend from 'url-append'
import {app} from './api/app.js'
let Vue:any = Vues
import VueResource from 'vue-resource'
Vue.use(VueResource)

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import iView from 'iview'
import 'iview/dist/styles/iview.css'
Vue.use(iView)

Vue.use(ElementUI, {size: 'small'})

Vue.config.productionTip = false

let baseUrl = {
  identitySiteRoot: localStorage.getItem('identitySiteRootSite'),
  roleUrl: localStorage.getItem('roleUrlSite'),
  appUrl: localStorage.getItem('appUrlSite'),
  rbs: localStorage.getItem('rbsSite'),
  webApiRoot: localStorage.getItem('webApiRootSite'),
  file: localStorage.getItem('fileSite')
}

Vue.prototype.$baseUrl=baseUrl

Vue.http.options.root = '/root'
Vue.http.options.before = function (request) {
  // Url增加一个随机数 处理IE缓存
  request.url = urlAppend(request.url, {r: Math.random()})
}

Vue.http.options.progress = function () {
  // 每个操作前检测是否超时
  if (!auth.loggedIn()) {
    location.href = 'login.html'
    return
  }
}

router.beforeEach((to, from, next) => {
  if (!auth.loggedIn()) {
    Vue.prototype.$Modal.confirm({
      title: '登陆过期',
      content: '登陆已过期，请重新登陆',
      onOk: function () {
        location.href = 'login.html'  // 登录超时！返回首页，next 死循环
      }
    })
    return
  } else {
    next()
  }
})

router.afterEach(route => {
  // 保存进历史
  app.addHistory(route)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})


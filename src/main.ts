// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vues from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex/store.js'
import * as auth from './api/auth/auth.js'
import {$api} from './api/common/commonApi'

import {debounce} from './api/common/debounce.js'


let Vue:any = Vues

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI, {size: 'mini'})

// import iView from 'iview'
// import 'iview/dist/styles/iview.css'
// Vue.use(iView)

import otable from 'hx-v'
import 'hx-v/dist/styles/common.css'
Vue.use(otable)

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
Vue.prototype.$api= $api
Vue.prototype.debounce= debounce

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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})


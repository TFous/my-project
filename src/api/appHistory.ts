import store from '../vuex/store.js'
import $ from 'jquery'

let blur = {
  type: 'danger'
}
let onblur = {
  type: ''
}
export const appHistory = {
  widthLimit: function () {
    let wrapWidth = $('.historyMenu').width()
    let tagWrap = $('.historyMenu .tagWrap')
    let tagWidth = tagWrap.width()
    console.log(tagWidth)

  },
  routerLimit: 10,
  closeTag: function (router: string) {
    let historys = appHistory.historys
    historys.forEach((item, index) => {
      if (item.router === router) {
        historys.splice(index, 1)
        localStorage.setItem('historys', JSON.stringify(historys));
        let routerChange = store.state.common.routerChange
        store.dispatch('setCommon', {routerChange: !routerChange})
        return true
      }
    })
  },
  historys: JSON.parse(localStorage.getItem('historys')) || [],
  isHas: false, // 列表中是否含有
  afterAdd: function (router: string, name: string, historys: Array<object>) {
    if (appHistory.isHas === false) {
      let nextRouter = {
        router: router,
        name: name,
        type: 'danger'
      }
      if (appHistory.historys.length >= appHistory.routerLimit) {
        appHistory.historys.splice(0, 1)
      }
      appHistory.historys.push(nextRouter)
      localStorage.setItem('historys', JSON.stringify(appHistory.historys));
    } else {
      localStorage.setItem('historys', JSON.stringify(historys));
    }
    let routerChange = store.state.common.routerChange
    store.dispatch('setCommon', {routerChange: !routerChange})
    // appHistory.widthLimit()
  },
  addHistory: function (router: string, name: string) {
    // 排除没有跳转的导航
    if (router === '') {
      return false
    }
    appHistory.isHas = false
    let historys = appHistory.historys
    // 初始化第一个
    if (historys.length === 0) {
      let firRouter = {
        router: router,
        name: name,
        type: 'danger'
      }
      localStorage.setItem('historys', JSON.stringify([firRouter]));
    } else {
      historys.forEach(item => {
        if (item.router === router) {
          (<any>Object).assign(item, blur)
          appHistory.isHas = true
        } else {
          (<any>Object).assign(item, onblur)
        }
      })
    }
    appHistory.afterAdd(router, name, historys)
  }
}

/**
 *   这个页面存放林琳碎碎 的一些data
 */
import {
  SET_DIC,
  INIT_FN
} from './../../mutation-types.js'
import o from 'o.js'
import store from '../../store.js'
// import {dicBook} from '../../../config/dic-map.js'
import urlAppend from 'url-append'

function getDicData (url, key) {
  o(urlAppend(url + key, {r: Math.random()})).get().then(function (data) {
    let datas = data.data
    if (datas.length === 0) {
      return
    }
    let o = {}
    o[key] = datas
    store.dispatch('setDic', o)
  })
}

let url = localStorage.getItem('rbsSite') + '/'

const state = {
  dic: {
    VarietyDict: [2.3, 4, 5, 6, 7],
    demo: String
  }
}

const getters = {}

const mutations = {
  [SET_DIC] (state, data) {
    (<any>Object).assign(state.dic, data)
  },
  [INIT_FN] (state, dicName) {
    getDicData(url, dicName)
  }
}

const actions = {
  setDic ({commit, state}, data:object) {
    commit(SET_DIC, data)
  },
  initFn ({commit, state}, dicName) {
    commit(INIT_FN, dicName)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

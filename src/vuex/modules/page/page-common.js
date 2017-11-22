/**
 *   这个页面存放林琳碎碎 的一些data
 */
import {
  SET_CLIENT_MSG,
  SET_COMMON,
  SET_UPLOAD_ID,
  SET_ACTION_MSG,
  SET_SHOW
} from './../../mutation-types.js'

const state = {
  noStdMsg: {}, // 拆分仓单信息
  clientMsg: null,
  show: false,
  upLoadId: null,
  lifeCycle: {},
  lifeCycleAction: [],
  tabs: null,  // Tab切换
  overMsg: null,  // 结算信息
  lifeActionInt: [],
  GetBillStatistics: [], // 账单统计信息
  varietyId: null, // 选中品种ID
  v8tId: null, // 选中子账号ID
  v8tName: null, // 选中子账号
  WarehousingItem: null, // 选中全部库
  WarehouseExpenseStandard: [], // 仓库已关联品种信息
  WarehousingExpenseStandard: [], // 特殊仓库已关联品种信息
  showList: {
    layer1: false,
    layer2: false,
    layer3: false,
    layer4: false,
    layer5: false,
    ExluploadShow: false,
    uploadShow: false
  }
}

const getters = {}

const mutations = {
  [SET_COMMON] (state, data) {
    Object.assign(state, data)
  },
  [SET_CLIENT_MSG] (state, data) {
    state.clientMsg = data
  },
  [SET_UPLOAD_ID] (state, id) {
    state.upLoadId = id
  },
  [SET_ACTION_MSG] (state, item) {
    if (item === null) {
      state.lifeActionInt = []
    } else {
      state.lifeActionInt.push(item)
    }
  },
  [SET_SHOW] (state, data) {
    // state.show = !state.show
    Object.assign(state.showList, data)
  }
}

const actions = {
  setCommon ({commit, state}, data) {
    commit(SET_COMMON, data)
  },
  setUploadId ({commit, state}, data) {
    commit(SET_UPLOAD_ID, data)
  },
  setClientMsg ({commit, state}, data) {
    commit(SET_CLIENT_MSG, data)
  },
  setlifeActionInt ({commit, state}, data) {
    commit(SET_ACTION_MSG, data)
  },
  setShow ({commit, state}, data) {
    commit(SET_SHOW, data)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

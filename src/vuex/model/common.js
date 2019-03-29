import * as types from '@/vuex/types.js'

const state = {
  alertMsg: '退出登录',
  showAlert: true
}

const getters = {
  showAlert: state => state.showAlert,
  alertMsg: state => state.alertMsg
}

const mutations = {
  [types.COMMON_SHOW_ALERT](state, status) {
    state.showAlert = status
  },
  [types.COMMON_ALERT_MSG](state, msg) {
    state.alertMsg = msg
  }
}

const actions = {
  showAlert({commit, status}) {
    commit(types.COMMON_SHOW_ALERT, status)
  },
  alertMsg({commit, msg}) {
    commit(types.COMMON_ALERT_MSG, msg)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

import Cookies from 'js-cookie'
import * as Types from '.././types'
import * as Api from '../.././api/api'
import {PERSON_TOGGLE_SIDEBAR} from ".././types";


const state = {
  sidebar: {
    // 这里+是将cookie的值转化为数字
    opened: !+Cookies.get('sidebarStatus'),
    withoutAnimation: false
  },
  device: 'desktop',

}

const getters = {

}

const mutations = {
  [Types.PERSON_TOGGLE_SIDEBAR](state) {
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
  },
  [Types.PERSON_CLOSE_SIDEBAR](state, withoutAnimation) {
    Cookies.set('sidebarStatus', 1)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },

}

const  actions = {
  toggleSideBar: ({ commit }) => {
    commit(Types.PERSON_TOGGLE_SIDEBAR)
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit(Types.PERSON_CLOSE_SIDEBAR, withoutAnimation)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

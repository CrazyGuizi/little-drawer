import * as User from '../.././api/api'
import * as Types from '../types'
import {KEY_USER} from "../../utils/constant";

const state = {
  nickName: '',
  username: '',
  password: '',
  imgIcon:'',
  token: ''
}

const actions = {
  login({commit}, userParams) {
    User.login(userParams, data => {
      commit(Types.USER_SET_USER, data)
    }, errors => {
      commit(Types.USER_CLEAR)
    })
  },
  register({commit}, userParams) {
    User.register(userParams, data => {
      commit(Types.USER_SET_USER, data)
    }, errors => {
      commit(Types.USER_CLEAR)
    })
  }
}

const mutations = {
  [Types.USER_SET_USER](state, user) {
    state.nickName = user.nickName
    state.username = user.username
    state.password = user.password
    state.imgIcon = user.imgIcon
    state.token = "online"
    localStorage.setItem(KEY_USER, JSON.stringify(user))
  },
  [Types.USER_CLEAR](state) {
    state.nickName = ''
    state.username = ''
    state.password = ''
    state.imgIcon = '',
    state.token = ''
    localStorage.removeItem(KEY_USER)
  }
}


export default {
  namespaced: true,
  state,
  mutations,
  actions
}

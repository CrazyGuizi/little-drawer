import * as User from '../.././api/api'
import * as Types from '../types'
import {KEY_USER} from "../../utils/constant";

const state = {
  id:0,
  nickName: '',
  username: '',
  password: '',
  iconUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBp9Eucf5jhyiT37463w8DTw3IYyqxKcWJZLXYcbBdMVd6kYaA',
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
    state.id = user.id
    state.nickName = user.nickName
    state.username = user.username
    state.password = user.password
    state.iconUrl = user.iconUrl
    state.token = "online"
    localStorage.setItem(KEY_USER, JSON.stringify(user))
  },
  [Types.USER_CLEAR](state) {
    state.id = 0
    state.nickName = ''
    state.username = ''
    state.password = ''
    state.iconUrl = '',
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

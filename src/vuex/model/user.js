import * as User from '../.././api/api'
import * as Types from '../types'
import {KEY_USER} from "../../utils/constant";

const state = {
  user:{
    id:0,
    nickName: '',
    username: '',
    password: '',
    iconUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBp9Eucf5jhyiT37463w8DTw3IYyqxKcWJZLXYcbBdMVd6kYaA',
    token: ''
  }
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
    state.user = user
    localStorage.setItem(KEY_USER, JSON.stringify(user))
  },
  [Types.USER_CLEAR](state) {
    state.user.id = 0
    state.user.nickName = ''
    state.user.username = ''
    state.user.password = ''
    state.user.iconUrl = ''
    state.user.token = ''
    localStorage.removeItem(KEY_USER)
  },
  [Types.USER_GET_USER_FROM_LOCAL](state) {
    const s = localStorage.getItem(KEY_USER);
    if (s == '' && state.user.username == '') {
      return
    }

    const  user = JSON.parse(s)
    state.user = user
  }
}


export default {
  namespaced: true,
  state,
  mutations,
  actions
}

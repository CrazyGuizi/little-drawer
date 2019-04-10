import * as User from '../.././api/api'
import * as Types from '../types'
import {KEY_USER} from "../../utils/constant";
import {getToken, removeToken, setToken} from "../../utils/func";

const state = {
  user:{
    id:0,
    nickName: '',
    username: '',
    password: '',
    iconUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBp9Eucf5jhyiT37463w8DTw3IYyqxKcWJZLXYcbBdMVd6kYaA',
    token: getToken()
  }
}

const actions = {
  login({commit}, userParams) {
    User.login(userParams, user => {
      commit(Types.USER_SET_USER, user)
    }, errors => {
      commit(Types.USER_CLEAR)
    })
  },
  register({commit}, userParams) {
    User.register(userParams, user => {
      commit(Types.USER_SET_USER, user)
    }, errors => {
      commit(Types.USER_CLEAR)
    })
  },
  logout({commit}) {
    commit(Types.USER_CLEAR)
  }
}

const mutations = {
  [Types.USER_SET_USER](state, user) {
    state.user = user
    setToken(user.token)
    localStorage.setItem(KEY_USER, JSON.stringify(user))
  },
  [Types.USER_CLEAR](state) {
    state.user.id = 0
    state.user.nickName = ''
    state.user.username = ''
    state.user.password = ''
    state.user.iconUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBp9Eucf5jhyiT37463w8DTw3IYyqxKcWJZLXYcbBdMVd6kYaA'
    state.user.token = ''
    removeToken()
    localStorage.removeItem(KEY_USER)
  },
  [Types.USER_GET_USER_FROM_LOCAL](state) {
    const s = localStorage.getItem(KEY_USER);
    if (s && state.user.username == '') {
      state.user = JSON.parse(s)
    }
  }
}


export default {
  namespaced: true,
  state,
  mutations,
  actions
}

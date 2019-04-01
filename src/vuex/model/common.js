import * as Types from '.././types'
import * as Api from '../.././api/api'
import {KEY_BACK_SENSITIVE_WORDS} from "../../utils/constant";

const state = {
  sensitiveWords:[],
  alertMsg: '退出登录',
  showAlert: true,
  comments:[],
  commentType:0
}

const getters = {
  showAlert: state => state.showAlert,
  alertMsg: state => state.alertMsg
}

const mutations = {
  [Types.COMMON_SHOW_ALERT](state, status) {
    state.showAlert = status
  },
  [Types.COMMON_ALERT_MSG](state, msg) {
    state.alertMsg = msg
  },
  [Types.COMMON_SET_SENSITIVE_WORDS](state, words) {
    state.sensitiveWords = words;
    localStorage.setItm(KEY_BACK_SENSITIVE_WORDS)
  },
  [Types.COMMON_SET_COMMENTS](state, data) {
    state.comments = data.comments;
    state.commentType = data.commentType;
  },
  [Types.COMMON_ADD_COMMENT](state, comment) {
    state.comments.push(comment)
  },
  [Types.COMMON_ADD_REPLY](state, data) {
    for (let i = 0; i < state.comments.length; i++) {
      if (state.comments[i].id == data.commentId) {
        state.comments[i].replys.push(data.reply)
        break
      }
    }
  },

}

const actions = {
  showAlert({commit, status}) {
    commit(Types.COMMON_SHOW_ALERT, status)
  },
  alertMsg({commit, msg}) {
    commit(Types.COMMON_ALERT_MSG, msg)
  },
  getSensitiveWords({commit}) {
    Api.getSensitiveWords(words => {
      const w = []
      words.forEach( e => w.push(e.word))
      commit(Types.COMMON_SET_SENSITIVE_WORDS, w)
    }, errors => {
    })
  },
  getComments({commit}, params) {
    Api.getComments(params, data => commit(Types.COMMON_SET_COMMENTS, data),
      errors => {})
  },
  sendComment({commit}, params) {
    Api.sendComment(params, comment => commit(Types.COMMON_ADD_COMMENT, comment),
      errors => {})
  },
  sendReply({commit}, params) {
    Api.sendReply(params, data => commit(Types.COMMON_ADD_REPLY, data),
      errors => {})
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
import * as Types from '.././types'
import * as Api from '../.././api/api'
import {KEY_BACK_SENSITIVE_WORDS} from "../../utils/constant";

const state = {
  sensitiveWords: [],
  alertMsg: '',
  isShowAlert: false,
  spinnerConfig: {
    isShow: false,
    type: 'border',
    variant: 'primary',
    isSmall: false,
    label: 'Loading'
  },
  like: {
    id: 0,
    status: 0,
    date: '2019-4-3 09:19:38'
  },
  collections:[],
  comments: [],
  commentType: 0,
}


const mutations = {
  [Types.COMMON_SHOW_ALERT](state, msg) {
    state.isShowAlert = true
    state.alertMsg = msg
  },
  [Types.COMMON_CLOSE_ALERT](state) {
    state.isShowAlert = false
    state.alertMsg = ''
  },
  [Types.COMMON_SET_SPINNER](state, spinnerConfig) {
    state.spinnerConfig = spinnerConfig
  },
  [Types.COMMON_SET_SENSITIVE_WORDS](state, words) {
    state.sensitiveWords = words;
    localStorage.setItm(KEY_BACK_SENSITIVE_WORDS)
  },
  [Types.COMMON_SET_COMMENTS](state, data) {
    state.comments = data
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
  [Types.COMMON_SET_LIKE_STATUS](state, like) {
    state.like = like
  },
  [Types.COMMON_GET_COLLECTIONS](state, collections) {
    state.collections = collections
  },
  [Types.COMMON_ADD_COLLECTION](state, collection) {
    state.collections.push(collection)
  },
  [Types.COMMON_DELETE_COMMENT](state, comment) {
    for (let i = 0; i < state.comments.length; i++) {
      if (state.comments[i].id == comment.id && state.comments[i].type == comment.type) {
        state.comments.splice(i,1)
        break
      }
    }
  }

}

const actions = {
  showAlert({commit, status}, msg) {
    commit(Types.COMMON_SHOW_ALERT, msg)
  },
  closeAlert({commit}) {
    commit(Types.COMMON_CLOSE_ALERT)
  },
  setSpinner({commit}, spinnerConfig) {
    commit(Types.COMMON_SET_SPINNER, spinnerConfig)
  },
  getSensitiveWords({commit}) {
    Api.getSensitiveWords(words => {
      const w = []
      words.forEach(e => w.push(e.word))
      commit(Types.COMMON_SET_SENSITIVE_WORDS, w)
    }, errors => {
    })
  },
  getCommentsByType({commit}, params) {
    Api.getCommentsByType(params, data => commit(Types.COMMON_SET_COMMENTS, data),
      errors => {
        commit(Types.COMMON_SET_COMMENTS, [])
      })
  },
  sendComment({commit}, params) {
    Api.sendComment(params, comment => commit(Types.COMMON_ADD_COMMENT, comment),
      errors => {
      })
  },
  sendReply({commit}, params) {
    const data = {
      commentId: params.commentId
    }
    Api.sendReply(params, reply => {
      data.reply = reply
        commit(Types.COMMON_ADD_REPLY, data)
      },
      errors => {
      })
  },
  getLikeStatus({commit}, params) {
    Api.getLikeStatus(params, like => {
      commit(Types.COMMON_SET_LIKE_STATUS, like)
    }, errors => {
      commit(Types.COMMON_SET_LIKE_STATUS, {
        id: 0,
        status: 0,
        date: '2019-4-3 09:19:38'
      })
    })
  },
  setLikeStatus({commit}, params) {
    Api.setLikeStatus(params, like => commit(Types.COMMON_SET_LIKE_STATUS, like),
      errors => commit(Types.COMMON_SET_LIKE_STATUS, {
        id: 0,
        status: 0,
        date: '2019-4-3 09:19:38'
      }))
  },
  getCollections({commit}, params) {
    Api.getCollections(params, c => commit(Types.COMMON_GET_COLLECTIONS, c), e => {})
  },
  addCollection({commit}, params) {
    Api.addCollection(params, c => commit(Types.COMMON_ADD_COLLECTION, c), e =>{})
  },
  getCommentsByUserId({commit}, params) {
    Api.getCommentsByUserId(params, data => commit(Types.COMMON_SET_COMMENTS, data),
        e => {
          commit(Types.COMMON_SET_COMMENTS, [])
        })
  },
  deleteComment({commit}, params) {
    Api.deleteComment(params, r => commit(Types.COMMON_DELETE_COMMENT, params), e => {})
  },
  deleteReply({commit}, params) {
    Api.deleteReply(params, r => commit(Types.COMMON_DELETE_COMMENT, params), e => {})
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

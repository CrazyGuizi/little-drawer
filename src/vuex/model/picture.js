
import * as Types from '.././types'
import * as Api from '../.././api/api'
import {NAMESPACE_COMMON} from "../../utils/constant";

const state = {
  pictures:[],
  myPictures:[]
}

const mutations = {
  [Types.PICTURE_SET_PICTURES](state, pictures) {
    state.pictures = pictures
  },
  [Types.PICTURE_SET_MY_PICTURES](state, pictures) {
    state.myPictures = pictures
  },
  [Types.PICTURE_REMOVE_MY_PICTURE](state, picture) {
    for (let i = 0; i < state.myPictures.length; i++) {
      if(state.myPictures[i].id == picture.id) {
        state.myPictures.splice(i,1)
        break
      }
    }
  },

}

const actions = {
  getPictures({commit}, params) {
    Api.getPictures(params, p => {
      commit(Types.PICTURE_SET_PICTURES, p)
      commit(NAMESPACE_COMMON + Types.COMMON_SET_SPINNER, {isShow:false}, {root:true})
    }, e => {
      commit(NAMESPACE_COMMON + Types.COMMON_SET_SPINNER, {isShow:false}, {root:true})
    })
  },
  getPicturesByUserId({commit, rootState}) {
    const userId = rootState.user.user.id
    if (userId) {
      Api.getPicturesByUserId({userId: userId}, p => {
        commit(Types.PICTURE_SET_MY_PICTURES, p)
      }, e => {
      })
    }
  },
  deletePictureById({commit}, params) {
    Api.deletePictureById(params, r => commit(Types.PICTURE_REMOVE_MY_PICTURE, params),
        e => {})
  }
}

export default {
  namespaced:true,
  state,
  mutations,
  actions
}

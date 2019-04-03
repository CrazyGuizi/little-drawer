
import * as Types from '.././types'
import * as Api from '../.././api/api'
import {NAMESPACE_COMMON} from "../../utils/constant";

const state = {
  pictures:[]
}

const mutations = {
  [Types.PICTURE_SET_PICTURES](state, pictures) {
    state.pictures = pictures
  }
}

const actions = {
  getPictures({commit}, params) {
    Api.getPictures(params, p => {
      commit(Types.PICTURE_SET_PICTURES, p)
      commit(NAMESPACE_COMMON + Types.COMMON_SET_SPINNER, {isShow:false}, {root:true})
    }, e => {
      commit(NAMESPACE_COMMON + Types.COMMON_SET_SPINNER, {isShow:false}, {root:true})
    })
  }
}

export default {
  namespaced:true,
  state,
  mutations,
  actions
}

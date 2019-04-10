import * as Types from "../types";
import * as Constant from "../../utils/constant";
import * as Api from "../../api/api";
import {NAMESPACE_COMMON} from "../../utils/constant";


const state = {
  // 首页视频集合
  indexVideos: {},
  recommendVideos: [],
  funnyVideos: [],
  gameVideos: [],
  lifeVideos: [],
  filmVideos: [],
  scienceVideos: [],
  otherVideos: [],
  relatedVideos: [],
  video: {},
  myVideos: []
}

const mutations = {
  [Types.VIDEO_SET_INDEX_VIDEOS](state, indexVideos) {
    state.indexVideos = indexVideos
    state.recommendVideos = indexVideos.recommendVideos
    state.funnyVideos = indexVideos.funnyVideos
    state.gameVideos = indexVideos.gameVideos
    state.lifeVideos = indexVideos.lifeVideos
    state.filmVideos = indexVideos.filmVideos
    state.scienceVideos = indexVideos.scienceVideos
    state.otherVideos = indexVideos.otherVideos
  },
  [Types.VIDEO_SET_VIDEOS](state, data) {
    const type = data.typeId
    switch (type) {
      case Constant.CONSTANT_VIDEO_FUNNY_VIDEOS:
        state.funnyVideos = data.videos
        break

      case Constant.CONSTANT_VIDEO_GAME_VIDEOS:
        state.gameVideos = data.videos
        break

      case Constant.CONSTANT_VIDEO_LIFE_VIDEOS:
        state.lifeVideos = data.videos
        break

      case Constant.CONSTANT_VIDEO_FILM_VIDEOS:
        state.filmVideos = data.videos
        break

      case Constant.CONSTANT_VIDEO_SCIENCE_VIDEOS:
        state.scienceVideos = data.videos
        break

      case Constant.CONSTANT_VIDEO_OTHER_VIDEOS:
        state.otherVideos = data.videos
        break
    }
  },
  [Types.VIDEO_SET_VIDEO](state, video) {
    state.video = video
  },
  [Types.VIDEO_SET_RECOMMEND_VIDEOS](state, videos) {
    state.recommendVideos = videos
  },
  [Types.VIDEO_SET_MY_VIDEOS](state, videos) {
    state.myVideos = videos
  },
  [Types.VIDEO_REMOVE_MY_VIDEO](state, video) {
    for (let i = 0; i < state.myVideos.length; i++) {
      if (state.myVideos[i].id == video.id) {
        state.myVideos.splice(i, 1)
        break
      }
    }
  },
}

const actions = {
  getIndexVideos({commit}) {
    Api.getIndexVideos(indexVideos => {
        commit(Types.VIDEO_SET_INDEX_VIDEOS, indexVideos)
      },
      errors => {
      })
  },
  getRecommendVideos({commit}) {
    Api.getRecommendVideos(videos => {
        commit(Types.VIDEO_SET_RECOMMEND_VIDEOS, videos)
      },
      errors => {
      })
  },
  getVideosByType({commit}, params) {
    Api.getVideosByType(params, data => {
      commit(Types.VIDEO_SET_VIDEOS, data)
      commit(NAMESPACE_COMMON + Types.COMMON_SET_SPINNER, {isShow: false}, {root: true})
    }, errors => {
      commit(NAMESPACE_COMMON + Types.COMMON_SET_SPINNER, {isShow: false}, {root: true})
    })
  },
  getVideoById({commit}, params) {
    Api.getVideosById(params, video => commit(Types.VIDEO_SET_VIDEO, video), errors => {
    })
  },
  getVideosByUserId({commit, rootState}) {
    const userId = rootState.user.user.id
    if (userId) {
      Api.getVideosByUserId({userId: userId}, videos => commit(Types.VIDEO_SET_MY_VIDEOS, videos), errors => {
      })
    }
  },
  deleteVideoById({commit}, params) {
    Api.deleteVideoById(params, r => commit(Types.VIDEO_REMOVE_MY_VIDEO, params), errors => {
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

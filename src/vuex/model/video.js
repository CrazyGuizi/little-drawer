import * as Types from "../types";
import * as Constant from "../../utils/constant";
import * as Api from "../../api/api";


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
  video:{},
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
  [Types.VIDEO_SET_VIDEOS](state, date) {
    const type = data.typeId
    switch (type) {
      case Constant.CONSTANT_VIDEO_FUNNY_VIDEOS:
        state.funnyVideos = date.funnyVideos
        break

      case Constant.CONSTANT_VIDEO_GAME_VIDEOS:
        state.gameVideos = date.gameVideos
        break

      case Constant.CONSTANT_VIDEO_LIFE_VIDEOS:
        state.lifeVideos = date.lifeVideos
        break

      case Constant.CONSTANT_VIDEO_FILM_VIDEOS:
        state.filmVideos = date.filmVideos
        break

      case Constant.CONSTANT_VIDEO_SCIENCE_VIDEOS:
        state.scienceVideos = date.scienceVideos
        break

      case Constant.CONSTANT_VIDEO_OTHER_VIDEOS:
        state.scienceVideos = date.scienceVideos
        break

      case Constant.CONSTANT_VIDEO_RECOMMEND_VIDEOS:
        state.recommendVideos = date.recommendVideos
        break
    }
  },
  [Types.VIDEO_SET_VIDEO](state, video) {
    state.video = video
  }
}

const actions = {
  getIndexVideos({commit}) {
    Api.getIndexVideos(indexVideos => {
        commit(Types.VIDEO_SET_INDEX_VIDEOS, indexVideos)
      },
      errors => {
      })
  },
  getVideosByType({commit}, params) {
    Api.getVideosByType(params, data => commit(Types.VIDEO_SET_VIDEOS, data), errors => {
    })
  },
  getVideoById({commit}, params) {
    Api.getVideosById(params, video => commit(Types.VIDEO_SET_VIDEO, video), errors => {
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

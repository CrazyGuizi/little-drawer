import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import common from "./model/common.js"
import user from  './model/user'
import news from  './model/news'
import video from  './model/video'
import picture from "./model/picture";

export default new Vuex.Store({
  modules: {
    common,
    user,
    news,
    video,
    picture
  }
})

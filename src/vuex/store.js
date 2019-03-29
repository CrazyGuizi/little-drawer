import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import common from "./model/common.js"
import user from  './model/user'
import news from  './model/news'

export default new Vuex.Store({
  modules: {
    common,
    user,
    news
  }
})

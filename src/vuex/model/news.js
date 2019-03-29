import * as Api from '../.././api/api'
import * as Types from '../types'
import {getNewsList} from "../.././api/api";

const state = {
  newsNavs:[],
  navName:'',
  navIcon:'',

  newsList:[],
  // 页面展示的新闻
  // newsShowList:[],

  newsId: 0,
  newsTitle: '',
  newsColumn: '',
  newsDate: '',
  newsPicUrls: [],
  newsContent: '',
  newsAuthor: '',
  newsStyle:0

}

const getters = {
  // newsShowList: state => {
  //   if (state.newsList != null && state.newsList.length <= 0) {
  //     console.log('返回了空')
  //     return []
  //   }  else {
  //     console.log('返回了' + JSON.stringify(state.newsList.slice(position - 10, position)))
  //     return state.newsList.slice(position - 10, position)
  //   }
  // }
}

const mutations = {
  [Types.NEWS_SET_NEWS_NAVS](state, newsNavs) {
    state.newsNavs = newsNavs
  },
  [Types.NEWS_SET_NEWS_LIST](state, newsList) {
    newsList.forEach(e => state.newsList.push(e))
  },
  [Types.NEWS_CLEAR_NEWS_LIST](state) {
    state.newsList = []
  }
}

const actions = {
  getNewsNavs({commit}) {
    Api.getNewsNavs(res => {
      commit(Types.NEWS_SET_NEWS_NAVS, res)
    }, errors => {
      commit(Types.NEWS_SET_NEWS_NAVS, [])
    })
  },
  getNewsList({commit, state}, params) {
    if (params == undefined || params == null) {
      params = {column:'推荐', page:1}
    }
    Api.getNewsList(params, res => {
      commit(Types.NEWS_SET_NEWS_LIST, res)
    }, errors => {
      commit(Types.NEWS_SET_NEWS_LIST, [])
    })
  },
  changeColumn({dispatch,commit, state}, params) {
    state.newsList = []
    console.log('清空列表')
    return dispatch('getNewsList', params)
  },
  searchNews({commit, state}, params) {
    state.newsList = []
    Api.searchNews(params, res => {
      commit(Types.NEWS_SET_NEWS_LIST, res)
    },errors => {
      commit(Types.NEWS_SET_NEWS_LIST, [])
    })
  }
}

export default {
  namespaced:true,
  state,
  getters,
  mutations,
  actions
}

import * as Api from '../.././api/api'
import * as Types from '../types'
import {getNewsList} from "../.././api/api";

const state = {
  newsNavs: [],
  navName: '',
  navIcon: '',

  newsList: [],
  myNews: [],
  // 页面展示的新闻
  // newsShowList:[],
  news:
    {
      id: 0,
      title: "",
      column: "",
      date: "",
      picUrl: [],
      content: "",
      author: "",
      style: 0
    },
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
  },
  [Types.NEWS_SET_MY_NEWS](state, news) {
    state.myNews = news
  },
  [Types.NEWS_DELETE_NEWS](state, newsId) {
    const newsList = state.myNews;
    for (let i = 0; i < state.myNews.length; i++) {
      if (state.myNews[i].id == newsId) {
        state.myNews.splice(i, 1)
        break
      }
    }
  }
}

const actions = {
  getNewsNavs({commit}) {
    const navs = [{
      "name": "头条",
      "icon": "http://q.qlogo.cn/qqapp/208656/2B6C8829139AE9CFDC16D2866092BD8B/100"
    },
      {
        "name": "推荐",
        "icon": "http://q.qlogo.cn/qqapp/208656/2B6C8829139AE9CFDC16D2866092BD8B/100"
      },
      {
        "name": "社会",
        "icon": "http://q.qlogo.cn/qqapp/208656/2B6C8829139AE9CFDC16D2866092BD8B/100"
      },
      {
        "name": "科技",
        "icon": "http://q.qlogo.cn/qqapp/208656/2B6C8829139AE9CFDC16D2866092BD8B/100"
      }, {
        "name": "生活",
        "icon": "http://q.qlogo.cn/qqapp/208656/2B6C8829139AE9CFDC16D2866092BD8B/100"
      }, {
        "name": "娱乐",
        "icon": "http://q.qlogo.cn/qqapp/208656/2B6C8829139AE9CFDC16D2866092BD8B/100"
      }, {
        "name": "农业",
        "icon": "http://q.qlogo.cn/qqapp/208656/2B6C8829139AE9CFDC16D2866092BD8B/100"
      }, {
        "name": "国际",
        "icon": "http://q.qlogo.cn/qqapp/208656/2B6C8829139AE9CFDC16D2866092BD8B/100"
      }, {
        "name": "体育",
        "icon": "http://q.qlogo.cn/qqapp/208656/2B6C8829139AE9CFDC16D2866092BD8B/100"
      }
    ]
    commit(Types.NEWS_SET_NEWS_NAVS, navs)
    // Api.getNewsNavs(res => {
    //   commit(Types.NEWS_SET_NEWS_NAVS, res)
    // }, errors => {
    //   commit(Types.NEWS_SET_NEWS_NAVS, [])
    // })
  },
  getNewsList({commit, state}, params) {
    if (params == undefined || params == null) {
      params = {column: '推荐', pageNum: 1, pageSize:10}
    }
    Api.getNewsList(params, res => {
      commit(Types.NEWS_SET_NEWS_LIST, res)
    }, errors => {
      commit(Types.NEWS_SET_NEWS_LIST, [])
    })
  },
  changeColumn({dispatch, commit, state}, params) {
    state.newsList = []
    console.log('清空列表')
    return dispatch('getNewsList', params)
  },
  searchNews({commit, state}, params) {
    state.newsList = []
    Api.searchNews(params, res => {
      commit(Types.NEWS_SET_NEWS_LIST, res)
    }, errors => {
      commit(Types.NEWS_SET_NEWS_LIST, [])
    })
  },
  getMyNews({commit, rootState}) {
    const userId = rootState.user.user.id
    if (userId) {
      Api.getNewsByUserId({userId: userId}, news => commit(Types.NEWS_SET_MY_NEWS, news),
        e => {
        commit(Types.NEWS_SET_MY_NEWS, [])
        })
    }
  },
  deleteNewsById({commit}, params) {
    Api.deleteNewsById(params, res => commit(Types.NEWS_DELETE_NEWS, params.newsId),
      e => {
      })
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

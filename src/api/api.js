import * as axios from './http.js'
import * as Constant from "./constant";

//*********用户**************
export function login(params, onSuccess, onFail) {
  axios.post(Constant.USER_LOGIN, params).then(res => {
    onSuccess(res.user)
  }, err => {
    onFail(err)
  })
}

export function register(params, onSuccess, onFail) {
  axios.post(Constant.USER_REGISTER, params).then(r => {
    onSuccess(r.user)
  }, e => {
    onFail(e)
  })
}

export function validateUsername(params, onSuccess, onFail) {
  axios.post(Constant.USER_VALIDATE_USERNAME, params).then(r => {
    onSuccess(r)
  }, e => {
    onFail(e)
  })
}


//*********新闻**************
export function getNewsNavs(onS, onF) {
  axios.get(Constant.NEWS_GET_NEWS_NAVS).then(res => {
    onS(res.navs)
  }, err => {
    onF(err)
  });
}

export function searchNews(keyWord, onS, onF) {
  axios.post(Constant.NEWS_SEARCH_NEWS, keyWord).then(res => {
    onS(res.newsList)
  }, err => {
    onF(err)
  });
}

export function getNewsList(culcom, onS, onF) {
  axios.post(Constant.NEWS_GET_NEWS_LIST, culcom).then(res => {
    onS(res.newsList)
  }, err => {
    onF(err)
  });
}

export async function getNewsById(newsId, onS, onF) {
  axios.post(Constant.NEWS_GET_NEWS_BY_ID, newsId).then(res => {
    onS(res.news)
  }, err => {
    onF(err)
  });
}

export async function getNewsComments(newsId, onS, onF) {
  axios.post(Constant.NEWS_GET_NEWS_COMMENTS, newsId).then(res => {
    onS(res.comments)
  }, err => {
    onF(err)
  });
}



import * as axios from './http.js'
import * as Constant from "./constant";

//****************************************************公共*****************************************************
export async function getComments(params, onS, onF) {
  axios.post(Constant.COMMON_GET_COMMENTS, params).then(res => {
    onS(res)
  }, err => {
    onF(err)
  });
}

// 发表评论
export async function sendComment(params, onS, onF) {
  axios.post(Constant.COMMON_SEND_COMMENTS, params).then(res => {
    onS(res.comment)
  }, err => {
    onF(err)
  });
}


// 发表回复
export async function sendReply(params, onS, onF) {
  axios.post(Constant.COMMON_SEND_REPLY, params).then(res => {
    onS(res)
  }, err => {
    onF(err)
  });
}

// 举报
export async function report(params, onS, onF) {
  axios.post(Constant.COMMON_REPORT, params).then(res => {
    onS(res)
  }, err => {
    onF(err)
  });
}





// ****************************************************用户*****************************************************
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


//****************************************************新闻*****************************************************
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

// 推荐相关联的新闻,两个参数，一个是类别，一个是请求新闻个数
export async function getNewsByColumn(params, onS, onF) {
  axios.post(Constant.NEWS_GET__NEWS_BY_COLUMN, params).then(res => {
    onS(res.newsList)
  }, err => {
    onF(err)
  });
}

// 获取敏感词库
export function getSensitiveWords(onS, onF) {
  axios.get(Constant.GET_SENSITIVE_WORDS).then(res => {
    onS(res.words)
  }, err => {
    onF(err)
  });
}



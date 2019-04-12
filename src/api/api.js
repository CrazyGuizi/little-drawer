import * as axios from './http.js'
import * as Constant from "./constant";

//****************************************************公共*****************************************************
export async function getCommentsByType(params, onS, onF) {
  axios.post(Constant.COMMON_GET_COMMENTS, params).then(res => {
    onS(res)
  }, err => {
    onF(err)
  });
}

export function getCommentsByUserId(params, onS, onF) {
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

export function deleteComment(params, onS, onF) {
  axios.post(Constant.COMMON_DELETE_COMMENT, params).then(res => {
    onS(res)
  }, err => {
    onF(err)
  });
}

export function deleteReply(params, onS, onF) {
  axios.post(Constant.COMMON_DELETE_REPLY, params).then(res => {
    onS(res)
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

// 点赞
export function getLikeStatus(params, onS, onF) {
  axios.post(Constant.COMMON_GET_LIKE_STATUS, params).then(res => {
    onS(res.like)
  }, err => {
    onF(err)
  });
}

export function setLikeStatus(params, onS, onF) {
  axios.post(Constant.COMMON_SET_LIKE_STATUS, params).then(res => {
    onS(res.like)
  }, err => {
    onF(err)
  });
}

export function getCollections(params, onS, onF) {
  axios.post(Constant.COMMON_GET_COLLECTIONS, params).then(res => {
    onS(res.collections)
  }, err => {
    onF(err)
  });
}

export function addCollection(params, onS, onF) {
  axios.post(Constant.COMMON_ADD_COLLECTION, params).then(res => {
    onS(res.collection)
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

export function getNewsByUserId(userId, onS, onF) {
  axios.post(Constant.NEWS_GET_NEWS_BY_USER_ID, userId).then(res => {
    onS(res.newsList)
  }, err => {
    onF(err)
  });
}

export function addNews(params, onS, onF) {
  axios.post(Constant.NEWS_ADD_NEWS, params).then(res => {
    onS(res.news)
  }, err => {
    onF(err)
  });
}

export function deleteNewsById(id, onS, onF) {
  axios.post(Constant.NEWS_DELETE_NEWS_BY_ID, id).then(res => {
    onS(res)
  }, err => {
    onF(err)
  });
}

export function updateNewsById(id, onS, onF) {
  axios.post(Constant.NEWS_UPDATE_NEWS_BY_ID, id).then(res => {
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



//****************************************************视频*****************************************************

export function getIndexVideos(onS, onF) {
  axios.get(Constant.VIDEO_GET_INDEX_VIDEOS).then(res => {
    onS(res.indexVideos)
  }, err => {
    onF(err)
  });
}

export function getRecommendVideos(onS, onF) {
  axios.get(Constant.VIDEO_GET_RECOMMEND_VIDEOS).then(res => {
    onS(res.videos)
  }, err => {
    onF(err)
  });
}

export function getVideosByType(params, onS, onF) {
  axios.post(Constant.VIDEO_GET_VIDEOS_BY_TYPE, params).then(res => {
    onS(res)
  }, err => {
    onF(err)
  });
}

export function getVideosById(params, onS, onF) {
  axios.post(Constant.VIDEO_GET_VIDEO_BY_ID, params).then(res => {
    onS(res.video)
  }, err => {
    onF(err)
  });
}

export function getVideosByUserId(params, onS, onF) {
  axios.post(Constant.VIDEO_GET_VIDEOS_BY_USER_ID, params).then(res => {
    onS(res.videos)
  }, err => {
    onF(err)
  });
}

export function deleteVideoById(params, onS, onF) {
  axios.post(Constant.VIDEO_DELETE_VIDEO_BY_ID, params).then(res => {
    onS(res)
  }, err => {
    onF(err)
  });
}

export function addVideo(params, onS, onF) {
  axios.post(Constant.VIDEO_ADD_VIDEO, params).then(res => {
    onS(res.video)
  }, err => {
    onF(err)
  });
}




//****************************************************图片*****************************************************

export function getPictures(params, onS, onF) {
  axios.post(Constant.PICTURE_GET_FUNNY_PICTURES, params).then(res => {
    onS(res.pictures)
  }, err => {
    onF(err)
  });
}

export function getPicturesByUserId(params, onS, onF) {
  axios.post(Constant.PICTURE_GET_PICTURES_BY_USER_ID, params).then(res => {
    onS(res.pictures)
  }, err => {
    onF(err)
  });
}

export function deletePictureById(params, onS, onF) {
  axios.post(Constant.PICTURE_DELETE_PICTURE_BY_ID, params).then(res => {
    onS(res)
  }, err => {
    onF(err)
  });
}

export function addPicture(params, onS, onF) {
  axios.post(Constant.PICTURE_ADD_PICTURE, params).then(res => {
    onS(res.picture)
  }, err => {
    onF(err)
  });
}



//****************************************************个人*****************************************************


/**
 * 关于网络的常量池
 * @type {string}
 */

// export const BASE_URL = 'http://192.168.43.3:8080'
export const BASE_URL = 'http://127.0.0.1:8080/api'
export const TIME_OUT = 10000
export const SUCCESS = 0


/**
 * 公共
 * @type {string}
 */
export const COMMON_GET_COMMENTS = 'common/getCommentsByTopic'
export const COMMON_ADD_COMMENT = 'common/addComment'
export const COMMON_DELETE_COMMENT = 'common/deleteComment'
export const COMMON_ADD_REPLY = 'common/addReply'
export const COMMON_DELETE_REPLY = 'common/deleteReply'
// 举报
export const COMMON_ADD_REPORT = "common/addReport";
export const COMMON_DELETE_REPORT = "common/deleteReport";
export const COMMON_GET_ALL_REPORTS = "common/getAllReports";
export const COMMON_GET_REPORTS_BY_TOPIC = "common/getReportsByTopic";
export const COMMON_ACCEPT_REPORT = "common/acceptReport";

// 点赞
export const COMMON_GET_LIKE_STATUS = 'common/getLikeStatus'
export const COMMON_SET_LIKE_STATUS = 'common/setLikeStatus'
export const COMMON_GET_COLLECTIONS = 'common/getCollections'
export const COMMON_ADD_COLLECTION = 'common/addCollection'
export const COMMON_GET_COLLECTION_STATUS = 'common/getCollectionStatus'


/**
 * 用户
 * @type {string}
 */
export const USER_LOGIN = 'user/login'
export const USER_REGISTER = 'user/register'
export const USER_VALIDATE_USERNAME = 'user/validateUsername'


/**
 * 新闻
 * @type {string}
 */
export const NEWS_GET_NEWS_NAVS = 'news/getNewsNavs'
export const NEWS_GET_NEWS_BY_COLUMN = 'news/getNewsRandom'
export const NEWS_GET_NEWS_BY_ID = 'news/getNewsById'
export const NEWS_GET_NEWS_BY_USER_ID = 'news/getNewsByUserId'
export const NEWS_GET__NEWS_RANDOM = 'news/getNewsRandom'
export const NEWS_SEARCH_NEWS = 'news/searchNews'
export const NEWS_ADD_NEWS = 'news/addNews'
export const NEWS_DELETE_NEWS_BY_ID = 'news/deleteNewsById'
export const NEWS_UPDATE_NEWS_BY_ID = 'news/updateNewsById'

// 获取敏感词库
export const GET_SENSITIVE_WORDS = 'getSensitiveWords'


/**
 * 视频
 * @type {string}
 */
export const VIDEO_GET_RECOMMEND_VIDEOS = 'video/getVideosRandom'
export const VIDEO_GET_VIDEOS_BY_TYPE = 'video/getVideosByType'
export const VIDEO_GET_VIDEO_BY_ID = 'video/getVideoById'
export const VIDEO_GET_VIDEOS_BY_USER_ID = 'video/getVideosByUserId'
export const VIDEO_DELETE_VIDEO_BY_ID = 'video/deleteVideo'
export const VIDEO_ADD_VIDEO = 'video/addVideo'

/**
 * 图片
 * @type {string}
 */
export const PICTURE_GET_FUNNY_PICTURES = 'picture/getFunnyPicturesRandom'
export const PICTURE_GET_PICTURES_BY_USER_ID = 'picture/getPicturesByUserId'
export const PICTURE_DELETE_PICTURE_BY_ID = 'picture/deletePicture'
export const PICTURE_ADD_PICTURE = 'picture/addPicture'

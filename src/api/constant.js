/**
 * 关于网络的常量池
 * @type {string}
 */

export const BASE_URL = 'http://192.168.43.3:8080'
export const TIME_OUT = 10000
export const SUCCESS = 0


/**
 * 公共
 * @type {string}
 */
export const COMMON_GET_COMMENTS = 'common/getComments'
export const COMMON_SEND_COMMENTS = 'common/sendComment'
export const COMMON_SEND_REPLY = 'common/sendReply'
// 举报
export const COMMON_REPORT = 'common/report'
// 点赞
export const COMMON_GET_LIKE_STATUS = 'common/getLikeStatus'
export const COMMON_SET_LIKE_STATUS = 'common/setLikeStatus'
export const COMMON_GET_COLLECTIONS = 'common/getCollections'
export const COMMON_ADD_COLLECTION = 'common/addCollection'


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
export const NEWS_GET_NEWS_LIST = 'news/getNewsList'
export const NEWS_GET_NEWS_BY_ID = 'news/getNewsById'
export const NEWS_GET__NEWS_BY_COLUMN = 'news/getNewsByColumn'
export const NEWS_SEARCH_NEWS = 'news/searchNews'

// 获取敏感词库
export const GET_SENSITIVE_WORDS = 'getSensitiveWords'


/**
 * 视频
 * @type {string}
 */
export const VIDEO_GET_INDEX_VIDEOS = 'video/getIndexVideos'
export const VIDEO_GET_RECOMMEND_VIDEOS = 'video/getRecommendVideos'
export const VIDEO_GET_VIDEOS_BY_TYPE = 'video/getVideosByType'
export const VIDEO_GET_VIDEO_BY_ID = 'video/getVideoById'

/**
 * 图片
 * @type {string}
 */
export const PICTURE_GET_FUNNY_PICTURES = 'picture/getFunnyPictures'

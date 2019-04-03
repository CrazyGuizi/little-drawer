import {KEY_NEWS_ID, KEY_LOCAL_SENSITIVE_WORDS, KEY_VIDEO_ID, DISPATCH_COMMON_SHOWALERT} from "./constant";
import {log} from "./log-util";

// 敏感词过滤
import FastScanner from 'fastscan'

export function showAlert(context, msg) {
  context.$store.dispatch(DISPATCH_COMMON_SHOWALERT, msg)

}

export function getNewsDetail(id) {
  if (id) {
    let resolve = this.$router.resolve({
      name: 'NewsDetail',
      params: {
        newsId: id
      },
    });

    localStorage.setItem(KEY_NEWS_ID, id)
    // 在新窗口打开
    window.open(resolve.href, '_blank')
    // this.$router.push({name:'newsDetail', params:{newsId:id}})
  }
}

export function isContainedSensitiveWord(content) {
  // https://github.com/pyloque/fastscan
  const word = KEY_LOCAL_SENSITIVE_WORDS;
  const scanner = new FastScanner(word)
  var result = scanner.hits(content, {quick: true, longest: false})
  // console.log(result)
  // var hits = scanner.hits(content)
  // console.log(hits)
  if (result != null && JSON.stringify(result) != '{}') {
    return true
  }

  return false
}

/**
 * 跳转到视频详情
 * @param id
 */
export function getVideoDetail(id) {
  if (id) {
    let resolve = this.$router.resolve({
      name: 'VideoDetail',
      params: {
        videoId: id
      },
    });

    localStorage.setItem(KEY_VIDEO_ID, id)
    // 在新窗口打开
    window.open(resolve.href, '_blank')
  }
}


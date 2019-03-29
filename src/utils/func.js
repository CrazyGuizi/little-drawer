import {KEY_NEWS_ID} from "./constant";
import {log} from "./log-util";

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

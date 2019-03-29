<template>
  <div>
    新闻详情:{{news}}

    新闻评论:{{comments}}
  </div>
</template>

<script>
  import {log} from "@/utils/log-util";
  import {KEY_NEWS_ID} from "../utils/constant";
  import * as Api from '../api/api'

  export default {
    name: "NewsDetail",
    data() {
      return {
        news:null,
        comments:[]
      }
    },
    computed:{

    },
    mounted() {
      // 路由跳转打开新窗口的时候参数没有接收到，暂时不知道为什么
      const newsId = localStorage.getItem(KEY_NEWS_ID)
      const vm = this
      const params = {newsId:newsId}

      Api.getNewsById(params, async news => {
        vm.news = news;
        // 获取新闻后才能获取评论
        await Api.getNewsComments(params, comments => {
          vm.comments = comments
        }, errors => {

        })
      }, errors => {
        vm.news = '获取新闻失败'
      })
  },
  }
</script>

<style scoped>

</style>

<template>
  <div class="news-detail">
    <b-container class="pt-4">
      <b-row>
        <b-col class="col-md-8">
          <b-row>
            <NewsArticle v-bind="news"/>
          </b-row>
          <hr>
          <b-row class="mt-5">
            这里是评论区
          </b-row>
        </b-col>

        <b-col class="col-md-4">
          <b-row>
            <p>相关推荐</p>
            <span class="refresh">换一换<img @click="refreshRecommend" src="@/assets/images/refresh.png"></span>
          </b-row>
          <b-row>
            <transition name="fade">
              <span v-if="recommendNewsList.length > 0">
              <NewsRecommendItem v-for="(news, index) in recommendNewsList" :key="index" v-bind="news"/>
              </span>
            </transition>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>

</template>

<script>
  import {log} from "@/utils/log-util";
  import {KEY_NEWS_ID} from "../utils/constant";
  import * as Api from '../api/api'
  import NewsRecommendItem from "@/components/NewsRecommendItem";
  import NewsArticle from "../components/NewsArticle";

  export default {
    name: "NewsDetail",
    components: {NewsArticle, NewsRecommendItem},
    data() {
      return {
        news: null,
        recommendNewsList: [],
        comments: []
      }
    },
    computed: {},
    mounted() {
      // 路由跳转打开新窗口的时候参数没有接收到，暂时不知道为什么
      const newsId = localStorage.getItem(KEY_NEWS_ID)
      const vm = this
      const params = {newsId: newsId}

      Api.getNewsById(params, async news => {
        vm.news = news;
        // 获取新闻后才能获取评论
        await Api.getNewsComments(params, comments => {
          vm.comments = comments
        }, errors => {

        })

        // 获取推荐的相关联新闻
        const p = {column: news.column, count: 3}
        await Api.getNewsByColumn(p, recommendNewsList => {
          vm.recommendNewsList = recommendNewsList
        }, errors => {
          // 获取推荐新闻失败
        })
      }, errors => {
        vm.news = '获取新闻失败'
      })
    },
    methods: {
      refreshRecommend() {
        const vm = this
        vm.recommendNewsList = []
        const p = {column: this.news.column, count: 3}
        Api.getNewsByColumn(p, recommendNewsList => {
          vm.recommendNewsList = recommendNewsList
        }, errors => {
          // 获取推荐新闻失败
        })
      }
    }
  }
</script>

<style scoped>
  .news-detail {
    background-color: #EEF2F6;
  }

  .refresh {
    position: absolute;
    right: 0px;
  }

  .refresh img {
    width: 25px;
    height: 25px;
    margin-left: 8px;
    cursor: pointer;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
  }

</style>

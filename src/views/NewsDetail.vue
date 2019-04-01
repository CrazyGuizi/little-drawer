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
            <NewsCommentEditor ref="refNewsCommentEditor" @commit="sendComment"/>
          </b-row>
          <hr>
          <NewsComment class="mt-4 mb-4" v-show="comments != null && comments.length > 0"
                       v-for="(comment, index) in comments" :key="index"
                       v-bind="comment" @commit="sendReply" @report="report"/>
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
  import * as Api from '../api/api'
  import NewsRecommendItem from "@/components/NewsRecommendItem";
  import NewsArticle from "../components/NewsArticle";
  import NewsCommentEditor from "../components/NewsCommentEditor";
  import BaseComment from '../components/BaseComment'
  import {isContainedSensitiveWord} from "../utils/func";
  import {KEY_NEWS_ID,DISPATCH_COMMON_GETSENSITIVEWORDS} from "@/utils/constant";
  import {
    CONSTANT_NEWS,
    DISPATCH_COMMON_GETCOMMENTS,
    DISPATCH_COMMON_SENDCOMMENT, KEY_NEWS_REPLY,
    KEY_USER,
    NAMESPACE_USER
  } from "../utils/constant";
  import {mapState, mapActions} from 'vuex'
  import {USER_SET_USER} from "../vuex/types";
  export default {
    name: "NewsDetail",
    components: {NewsCommentEditor, NewsArticle, NewsRecommendItem, 'NewsComment':BaseComment},
    data() {
      return {
        news: {},
        recommendNewsList: [],
      }
    },
    computed:{
      ...mapState('common',{
        comments:'comments'
      })
    },
    mounted() {
      // 路由跳转打开新窗口的时候参数没有接收到，暂时不知道为什么
      this.$store.commit(NAMESPACE_USER + USER_SET_USER, JSON.parse(localStorage.getItem(KEY_USER)))
      const newsId = localStorage.getItem(KEY_NEWS_ID)
      const vm = this
      const params = {newsId: newsId}

      Api.getNewsById(params, news => {
        vm.news = news;
        // 获取新闻后获取评论
        this.$store.dispatch(DISPATCH_COMMON_GETCOMMENTS, {topicType:0, topicId:newsId})

        // 获取推荐的相关联新闻
        const p = {column: news.column, count: 3}
        Api.getNewsByColumn(p, recommendNewsList => {
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
      },
      sendComment(content) {
        if (isContainedSensitiveWord(content)) {
          alert('评论内容含有敏感内容，请修改后再发布')
          return
        } else {
          const user = JSON.parse(localStorage.getItem(KEY_USER))
          const params = {
            topicType: CONSTANT_NEWS,
            topicId:this.news.id,
            userId:user.id,
            content:content
          }
          this.$store.dispatch(DISPATCH_COMMON_SENDCOMMENT, params)
          this.$refs.refNewsCommentEditor.content = ''
        }
      },
      sendReply(data) {
        console.log(JSON.parse(localStorage.getItem(KEY_NEWS_REPLY)))
      },
      report() {
        alert('举报')
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

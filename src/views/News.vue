<template>
  <div class="news" keep-alive>
    <b-container>
      <!-- 导航-->
      <b-row>
        <b-col id="news-nav" cols="4">
          <b-container>
            <b-row>
              <b-nav-form id="search" @submit.prevent="searchNews">
                <b-form-input required size="sm" class="mr-sm-2" type="text" v-model="searchWord" placeholder="Search"/>
                <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
              </b-nav-form>
            </b-row>

            <NewsNav v-for="(nav, index) of navs" :key="index" v-bind="nav" @changeTab="changeTab(nav.name)"/>

          </b-container>

        </b-col>

        <!-- 新闻列表 -->
        <b-col cols="8">
          <div v-for="(news, index) in showList" :key="index">
            <NewsItemOne v-if="news.style == 1" v-bind="news"/>
            <NewsItemTwo v-else-if="news.style == 2" v-bind="news"/>
            <NewsItemThree v-else v-bind="news"/>
          </div>

          <b-container v-show="!isChangingTab" id="load-more">
            <LoadMore v-show="!isLoadMore" @loadMore="loadMore"/>
            <b-spinner v-show="isLoadMore"></b-spinner>
          </b-container>
          <b-container v-show="isChangingTab" id="changing-tab">
            <p>正在玩命加载中……</p>
          </b-container>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>

  import NewsNav from '@/components/NewsNav'
  import NewsItemOne from '@/components/NewsItemOne'
  import NewsItemTwo from '@/components/NewsItemTwo'
  import NewsItemThree from '@/components/NewsItemThree'
  import LoadMore from '@/components/LoadMore'

  import {log} from "@/utils/log-util"
  import * as Types from '@/vuex/types'
  import {mapState,mapMutations, mapActions} from 'vuex'
  import {
    DISPATCH_NEWS_CHANGECOLUMN,
    DISPATCH_NEWS_GETNEWSLIST,
    DISPATCH_NEWS_GETNEWSNAVS,
    DISPATCH_NEWS_SEARCHNEWS,
    NAMESPACE_NEWS
  } from "@/utils/constant";

  export default {
    name: 'News',
    data: function () {
      return {
        page:1,
        column:'头条',
        searchWord:'',
        isLoadMore: false,
        isChangingTab: false,
      }
    },
    components: {
      NewsNav, NewsItemOne, NewsItemTwo, NewsItemThree, LoadMore
    },
    mounted() {
      this.$store.dispatch(DISPATCH_NEWS_GETNEWSNAVS)
      this.$store.commit(NAMESPACE_NEWS + Types.NEWS_CLEAR_NEWS_LIST)
      this.$store.dispatch(DISPATCH_NEWS_GETNEWSLIST, {column: '头条', page: 1})
    },
    computed: {
      ...mapState('news', {
        navs: 'newsNavs',
        showList: 'newsList'
      }),
    },
    methods: {
      searchNews(evt) {
        if (this.searchWord.trim() == '') {
          this.searchWord = ''
        } else {
          this.$store.dispatch(DISPATCH_NEWS_SEARCHNEWS, {keyWord: this.searchWord})
        }
      },
      // 改变频道
      changeTab(column) {
        log('选择的频道是' + JSON.stringify(column))
        this.isChangingTab = true;
        this.page = 1;
        this.column = column
        this.$store.dispatch(DISPATCH_NEWS_CHANGECOLUMN, {column:this.column, page:this.page})
        this.isChangingTab = false;

      },
      // 点击加载更多
      loadMore() {
        this.isLoadMore = true;
        this.$store.dispatch(DISPATCH_NEWS_GETNEWSLIST, {column:this.column, page:++this.page})
        this.isLoadMore = false;
      }
    }
  }
</script>

<style>
  #news-nav {
    padding: 10px;
    margin-top: 10px;
    border: 1px solid whitesmoke;
    border-radius: 10px;
    background: white;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }

  #load-more {
    margin-top: 10px;
    text-align: center;
  }

  #changing-tab {
    margin-top: 30%;
    text-align: center;
  }
</style>

<template>
  <b-container id="news-item-one">
    <b-row  class="news-title">
      <h4 class="title-link" @click="getNewsDetail(id)">{{title}}</h4>
    </b-row>
    <b-row class="news-content">
      <p class="content" ><span v-html="content"/> </p>
    </b-row>
    <b-row class="author-time">
      <p>{{author.nickName}} {{date}}</p>
    </b-row>
  </b-container>

</template>

<script>
  import {getNewsDetail} from "@/utils/func";

  /**
   * 一张图
   */
  export default {
    name: "NewsItemOne",
    props: {
      id: Number,
      title: {
        type: String,
        default() {
          return '假装这里是一个正经的标题'
        }
      },
      author: {
        type: Object,
        default:function() {
          return {
            nickName: '土小贵'
          }
        }
      },
      date: {
        type:String,
        default() {
          return '2019-03-13 14:17:56'
        }
      },
      content: {
        type: String,
        default() {
          return 'vue之从入门到放弃系列，就随便说些什么话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话话吧';
        }
      }
    },
    methods: {
      getNewsDetail
    }
  }
</script>



<style scoped>
  #news-item-one {
    padding: 10px;
    margin-top: 10px;
    border: 1px solid whitesmoke;
    border-radius: 10px;
    background: white;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }

  .news-title {
    margin-left: 10px;
    display: block;
  }

  .title-link:hover {
    cursor: pointer;
    color: dodgerblue;
  }

  .news-content {
    margin-left: 10px;
    display: block;
  }

  .content {
    /*overflow: hidden;*/
    /*text-overflow: ellipsis;*/
    /*white-space: nowrap;*/
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }

  .author-time {
    display: block;
    margin-left: 10px;
  }

  .author-time p {
    color: #888;
  }
</style>

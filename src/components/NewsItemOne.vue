<template>
  <b-container>
    <b-row id="news-item-one">
      <b-col cols="10" id="news-title">
        <h4 class="title-link" @click="getNewsDetail(id)">{{title}}</h4>
        <span id="author-time">{{author.nickName}} {{date}}</span>
      </b-col>
      <b-col cols="2">
        <img id="news-pic" :src="picUrls" width="100" height="100">
      </b-col>
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
          return '习近平同法国总统马克龙会谈'
        }
      },
      author: {
        type: Object,
        default: function () {
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
      picUrls: {
        type: Array,
        default() {
          return ['http://www.xinhuanet.com/world/2019-03/26/1124281341_15535500629521n.jpg'];
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

  .title-link:hover {
    cursor: pointer;
    color: dodgerblue;
  }

  #left {
    display: inline-block;
  }

  #right {
    display: inline-block;
  }

  #news-pic {
    text-align: center;
    object-fit: cover;
  }

  #author-time {
    color: #888;
    position: absolute;
    bottom: 0px;
  }
</style>

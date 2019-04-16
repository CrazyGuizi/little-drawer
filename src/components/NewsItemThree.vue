<template>
  <b-container id="news-item-three">
    <b-row id="news-title">
      <h4 class="title-link" @click="getNewsDetail(id)">{{title}}</h4>
    </b-row>
    <b-row id="news-pic">
      <b-col v-for="(picUrl, index)  in picUrls" :key="index"><img  :src="picUrl" width="100" height="100"></b-col>
    </b-row>

    <b-row><span id="author-time">{{author.nickName}} {{date}}</span></b-row>
  </b-container>
</template>


<script>
  import {getNewsDetail} from "@/utils/func";

  /**
   * 三张图
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
            nickName: "土娃",
            iconUrl: "https://hbimg.huabanimg.com/4f1b23073e6162f6cc057644da466bbb2980bce451cad-MRi6mO_fw658",
          }
        }
      },
      date: {
        type:String,
        default() {
          return '2019-03-13 14:17:56'
        }
      },
      formatDate: {
        type: String,
        default() {
          return new Date().toDateString();
        }
      },
      picUrls: {
        type: Array,
        default() {
          return ["http://cms-bucket.ws.126.net/2019/03/26/fa230eb7d11c4f0480803fcb14dc918b.jpeg", "http://cms-bucket.ws.126.net/2019/03/26/fa230eb7d11c4f0480803fcb14dc918b.jpeg", "http://cms-bucket.ws.126.net/2019/03/26/fa230eb7d11c4f0480803fcb14dc918b.jpeg"];
        }
      }
    },
    methods: {
      getNewsDetail
    }
  }
</script>

<style scoped>
  #news-item-three {
    padding: 10px;
    margin-top: 10px;
    border: 1px solid whitesmoke;
    border-radius: 10px;
    background: white;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
 #news-title {
   margin-left: 10px;
   display: block;
 }

  .title-link:hover {
    cursor: pointer;
    color: dodgerblue;
  }

  #news-pic img {
    object-fit: cover;
    text-align: center;
  }
  #author-time {
    color: #888;
    position: relative;
    left: 30px;
    margin-top: 10px;
  }
</style>

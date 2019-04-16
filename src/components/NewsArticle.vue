<template>
  <b-container>
    <h1 class="title mt-5">{{title}}</h1>
    <p class="author-date mt-3">日期：{{date}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;作者：{{author.nickName}}</p>
    <span class="mt-5"/>
    <span v-html="content"/>
  </b-container>
</template>

<script>
  export default {
    name: "NewsArticle",
    props: {
      title: {
        type: String,
        default: '假装这里有一个标题'
      },
      date: {
        type: String,
        default: "2019-03-13 14:17:56"
      },
      author: {
        type: Object,
        default: function () {
          return {
            "id": 8,
            "nickName": "土娃",
            "iconUrl": "https://hbimg.huabanimg.com/4f1b23073e6162f6cc057644da466bbb2980bce451cad-MRi6mO_fw658",
          }
        }
      },
      content: {
        type: String,
        default: '<span style="color: red">别看了，啥也没有</span>'
      }
    }
  }
</script>

<style scoped>

  .author-date {
    font-size: 16px;
    color: #888;
  }
</style>

<template>
  <b-container>
    <h1 class="title mt-5">{{title}}</h1>
    <p class="author-date mt-3">日期：{{date}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;作者：{{author}}</p>
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
        type: String,
        default: "土小贵"
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

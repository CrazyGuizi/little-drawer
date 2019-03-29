<template>
  <div>
    <p>{{msg}}</p>
  </div>
</template>

<script>

  import * as http from "../api/http";

  export default {
    name: "Video",
    components: {

    },
    data() {
      return {
        msg:''
      }
    },
    methods: {

    },
    computed: {
    },
    mounted() {
      http.get('/news/getNewsList').then(r => {
        this.msg = r
      }, e => {
        this.msg = e
      })
    }
  }
</script>

<style scoped>

  #nav {
    margin: 0px;
    background-color: #D32F2F;
    padding-top: 30px;
    padding-bottom: 30px;

    a {
      font-weight: bold;
      color: white;
      margin-left: 40px;
      margin-right: 40px;

      &.router-link-exact-active {
        color: #42b983;
      }
    }

  }
</style>

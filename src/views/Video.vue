<template>
  <b-container>
    <b-row>
      <p>推荐视频</p>
      <span>刷新</span>
    </b-row>
    <b-row>
      <b-col class="col-md-4">hahha</b-col>
      <b-col class="col-md-4">hahha</b-col>
      <b-col class="col-md-4">hahha</b-col>
    </b-row>
  </b-container>
</template>

<script>

  import * as http from "../api/http";
  import {DISPATCH_VIDEO_GETINDEXVIDEOS} from "../utils/constant";

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
      this.$store.dispatch(DISPATCH_VIDEO_GETINDEXVIDEOS)
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

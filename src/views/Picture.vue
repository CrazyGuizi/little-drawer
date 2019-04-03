<template>
  <b-container>
    <b-row>
      <b-col class="col-md-4" v-for="(p,index) in pictures" :key="index" >
        <PictureItem v-bind="p"/>
      </b-col>
    </b-row>

    <div class="text-center mt-4 mb-4">
        <BaseSpinner/>
        <b-button class="refresh" v-show="!spinnerConfig.isShow" variant="outline-primary" @click="refresh">点我刷新</b-button>
    </div>
  </b-container>
</template>

<script>
  import PictureItem from "../components/PictureItem";
  import {DISPATCH_PICTURE_GETPICTURES, NAMESPACE_COMMON} from "../utils/constant";
  import {mapState} from "vuex";
  import {COMMON_SET_SPINNER} from "../vuex/types";
  import BaseSpinner from "../components/BaseSpinner";

  export default {
    name: "Picture",
    components: {BaseSpinner, PictureItem},
    computed:{
      ...mapState('picture',['pictures']),
      ...mapState('common', ['spinnerConfig'])
    },
    mounted() {
      const pictureParams = {
        page:6
      }
      this.$store.dispatch(DISPATCH_PICTURE_GETPICTURES,pictureParams)
    },
    methods:{
      refresh() {
        const pictureParams = {
          page:6
        }
        this.$store.commit(NAMESPACE_COMMON + COMMON_SET_SPINNER, {isShow:true,type:'border', variant:'primary'})
        this.$store.dispatch(DISPATCH_PICTURE_GETPICTURES,pictureParams)
      }
    }
  }
</script>

<style scoped>
  .refresh {
    cursor: pointer;
  }
</style>

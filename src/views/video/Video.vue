<template>
  <b-container>
    <b-row class="mt-md-4">
      <b-col class="col-md-2">
      <h5>推荐视频</h5>
      </b-col>
      <b-col class="col-md-9"><span></span></b-col>
      <b-col class="col-md-1">
        <h6 class="refresh-recommend" @click="refreshRecommendVideos">点击刷新</h6>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="col-md-4 mt-4" v-for="(video, index) in recommendVideos" :key="index">
        <VideoWithTypeNameItem v-bind="{video:video}"/>
      </b-col>
    </b-row>
    <hr class="style-seven mt-md-5">
    <!--分类视频-->
    <b-row>
      <b-container>
        <b-card no-body>
          <b-tabs pills card>
            <!--搞笑-->
            <b-tab :title="videoTypes[0]" active @click="changeTab(0)">
              <b-card-text>
                <b-row>
                  <b-col class="col-md-3 mt-4" v-for="(video, index) in funnyVideos" :key="index">
                    <VideoItem v-bind="video" :isPosterSmall="true"/>
                  </b-col>
                </b-row>
              </b-card-text>
            </b-tab>

            <!--游戏-->
            <b-tab :title="videoTypes[1]" @click="changeTab(1)">
              <b-card-text>
                <b-row>
                  <b-col class="col-md-3 mt-4" v-for="(video, index) in gameVideos" :key="index">
                    <VideoItem v-bind="video" :isPosterSmall="true"/>
                  </b-col>
                </b-row>
              </b-card-text>
            </b-tab>

            <!--生活-->
            <b-tab :title="videoTypes[2]" @click="changeTab(2)">
              <b-card-text>
                <b-row>
                  <b-col class="col-md-3 mt-4" v-for="(video, index) in lifeVideos" :key="index">
                    <VideoItem v-bind="video" :isPosterSmall="true"/>
                  </b-col>
                </b-row>
              </b-card-text>
            </b-tab>

            <!--影视-->
            <b-tab :title="videoTypes[3]" @click="changeTab(3)">
              <b-card-text>
                <b-row>
                  <b-col class="col-md-3 mt-4" v-for="(video, index) in filmVideos" :key="index">
                    <VideoItem v-bind="video" :isPosterSmall="true"/>
                  </b-col>
                </b-row>
              </b-card-text>
            </b-tab>

            <!--科技-->
            <b-tab :title="videoTypes[4]" @click="changeTab(4)">
              <b-card-text>
                <b-row>
                  <b-col class="col-md-3 mt-4" v-for="(video, index) in scienceVideos" :key="index">
                    <VideoItem v-bind="video" :isPosterSmall="true"/>
                  </b-col>
                </b-row>
              </b-card-text>
            </b-tab>

            <!--其他-->
            <b-tab :title="videoTypes[5]" @click="changeTab(5)">
              <b-card-text>
                <b-row>
                  <b-col class="col-md-3 mt-4" v-for="(video, index) in otherVideos" :key="index">
                    <VideoItem v-bind="video" :isPosterSmall="true"/>
                  </b-col>
                </b-row>
              </b-card-text>
            </b-tab>

          </b-tabs>
        </b-card>
      </b-container>
    </b-row>
    <!--<b-row class="text-md-center">-->
    <!--<span>点我刷新</span>-->
    <!--</b-row>-->
    <div class="text-md-center mt-4 mb-4">
      <span>
        <BaseSpinner/>
        <span class="refresh" v-show="!spinnerConfig.isShow" @click="refresh">点我刷新</span>
      </span>
    </div>
  </b-container>
</template>

<script>

  import * as http from "../../api/http";
  import VideoItem from "../../components/VideoItem";
  import VideoWithTypeNameItem from "../../components/VideoWithTypeNameItem";
  import {mapState} from 'vuex'
  import BaseSpinner from "../../components/BaseSpinner";
  import {
    DISPATCH_VIDEO_GETINDEXVIDEOS,
    DISPATCH_VIDEO_GETRECOMMENDVIDEOS,
    DISPATCH_VIDEO_GETVIDEOSBYTYPE,
    NAMESPACE_COMMON
  } from "../../utils/constant";
  import {COMMON_SET_SPINNER} from "../../vuex/types";

  export default {
    name: "Video",
    components: {
      BaseSpinner,
      VideoWithTypeNameItem,
      VideoItem

    },
    data() {
      return {
        msg: '',
        videoTypes: ['搞笑', '游戏', '生活', '影视', '科技', '其他'],
        typeIndex: 0,
      }
    },
    methods: {
      changeTab(index) {
        this.typeIndex = index
      },
      refreshRecommendVideos() {
        const params = {
          pageNum:1,
          pageSize:6
        }

        this.$store.dispatch(DISPATCH_VIDEO_GETRECOMMENDVIDEOS, params)
      },
      refresh() {
        const params = {
          typeIndex: this.typeIndex,
          pageNum:1,
          pageSize: 8
        }

        // todo 刷新视频

        this.$store.commit(NAMESPACE_COMMON + COMMON_SET_SPINNER, {isShow:true,type:'grow', variant:'primary'})
        this.$store.dispatch(DISPATCH_VIDEO_GETVIDEOSBYTYPE, params)
      }

    },
    computed: {
      ...mapState('video', {
        recommendVideos: 'recommendVideos',
        funnyVideos: 'funnyVideos',
        gameVideos: 'gameVideos',
        lifeVideos: 'lifeVideos',
        filmVideos: 'filmVideos',
        scienceVideos: 'scienceVideos',
        otherVideos: 'otherVideos'
      }),
      ...mapState('common', {
        spinnerConfig: 'spinnerConfig'
      })
    },
    mounted() {
      const params = {
      pageNum:1,
      pageSize:6
      }
      this.$store.dispatch(DISPATCH_VIDEO_GETRECOMMENDVIDEOS, params)

      for (var i = 0; i < 6; i++) {
        const p = {
          pageNum:1,
          pageSize:8,
          typeIndex:i
        }

        this.$store.dispatch(DISPATCH_VIDEO_GETVIDEOSBYTYPE, p)
      }
    }
  }
</script>

<style scoped>

  .refresh-recommend {
    cursor: pointer;
  }

  hr.style-seven {
    height: 30px;
    border-style: solid;
    border-color: black;
    border-width: 1px 0 0 0;
    border-radius: 20px;
  }

  hr.style-seven:before {
    display: block;
    content: "";
    height: 30px;
    margin-top: -31px;
    border-style: solid;
    border-color: black;
    border-width: 0 0 1px 0;
    border-radius: 20px;
  }

  .refresh {
    cursor: pointer;
  }
</style>

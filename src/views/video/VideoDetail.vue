<template>
  <b-container class="mt-5">
    <b-row>
      <b-col class="col-md-9">
        <!--播放器-->
        <span class="video-title ">{{video.title}}</span>
        <div class="mt-md-4">
          <b-embed type="video" aspect="16by9" controls :poster="video.posterUrl">
            <source :src="video.sourceUrl" type="video/mp4">
          </b-embed>
        </div>

        <!--简介作者信息等-->
        <b-container class="mt-5">
          <b-row class="align-items-center">
            <b-img class="icon" :src="video.author.iconUrl" rounded="circle"/>
            <span class="video-author ml-md-2">{{video.author.nickName}}</span>
          </b-row>
          <b-row class="mt-2">
            <span>简介：</span>
            <span class="video-describe" v-html="video.describe"></span>
          </b-row>
          <b-row class="align-items-center mt-2">
            <b-img class="video-like" v-if="like.status == 0" src="@/assets/images/unlike.png" @click="iLike">点赞</b-img>
            <b-img v-else src="@/assets/images/like.png">点赞</b-img>
            <span v-if="!hasLiked" class="ml-2">{{video.like}}</span>
            <span v-else class="ml-2">{{video.like + 1}}</span>
          </b-row>
        </b-container>

        <hr>

        <!--评论-->
        <VideoCommentEditor ref="refVideoCommentEditor" @commit="sendComment"/>

        <h4 v-if="comments.length <= 0" class="mt-4 mb-4">暂无评论</h4>
        <h4 v-else class="mt-4 mb-4">全部评论</h4>

        <VideoComment v-for="(comment,index) in comments" :key="index" v-bind="comment"/>

      </b-col>

      <b-col class="col-md-3">
        <b-container>
          <b-row>
            <span class="text-bold">他的视频:</span>
          </b-row>
          <b-row class="mt-2">
            视频一
            视频一
            视频一
          </b-row>
        </b-container>

        <b-container class="mt-md-4">
          <b-row>
            <span class="text-bold">相关视频:</span>
          </b-row>
          <b-row class="mt-2">
            视频一
            视频一
            视频一
            视频一
          </b-row>
        </b-container>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  import {
    CONSTANT_VIDEO,
    DISPATCH_COMMON_GETCOMMENTSBYTYPE,
    DISPATCH_COMMON_GETLIKESTATUS,
    DISPATCH_COMMON_SENDCOMMENT,
    DISPATCH_COMMON_SETLIKESTATUS, DISPATCH_COMMON_SHOWALERT,
    DISPATCH_VIDEO_GETVIDEOBYID,
    KEY_USER,
    KEY_VIDEO_ID
  } from "../../utils/constant";
  import {mapState} from 'vuex'
  import CommentEditor from "../../components/CommentEditor";
  import BaseComment from '../../components/BaseComment'
  import {isContainedSensitiveWord, showAlert} from "../../utils/func";


  export default {
    name: "VideoDetail",
    components: {
      'VideoCommentEditor': CommentEditor,
      'VideoComment': BaseComment
    },
    data: function () {
      return {
        hasLiked:false
      }
    },
    mounted() {
      let id = localStorage.getItem(KEY_VIDEO_ID)
      const params = {
        videoId: id
      }

      // 获取视频详情
      this.$store.dispatch(DISPATCH_VIDEO_GETVIDEOBYID, params)

      // 获取视频评论
      const commentParams = {topicType: CONSTANT_VIDEO, topicId: id}
      this.$store.dispatch(DISPATCH_COMMON_GETCOMMENTSBYTYPE, commentParams)

      // 获取该用户对视频的点赞状态
      if (this.user.id != 0) {
        const likeParams = {
          topicType: CONSTANT_VIDEO,
          topicId:id,
          userId: this.user.id}
        this.$store.dispatch(DISPATCH_COMMON_GETLIKESTATUS, likeParams)
      }
    },
    watch:{
      // 路由变化会再次执行该方法
      // '$route': 'fetchData'
    },
    computed: {
      ...mapState('video', ['video']),
      ...mapState('common', ['comments', 'like']),
      ...mapState('user', ['user'])
    },
    methods: {
      sendComment(content) {
        if (this.user.id == 0) {
          showAlert(this, '请先登录')
          return
        }

        if (isContainedSensitiveWord(content)) {
          this.$store.dispatch(DISPATCH_COMMON_SHOWALERT, '评论内容含有敏感内容，请修改后再发布')
          return
        } else {
          const user = JSON.parse(localStorage.getItem(KEY_USER))
          console.log(content)

          const params = {
            topicType: CONSTANT_VIDEO,
            topicId: this.video.id,
            fromUser:{
              id: user.id
            },
            content: content
          }
          this.$store.dispatch(DISPATCH_COMMON_SENDCOMMENT, params)

          this.$refs.refVideoCommentEditor.content = ''
        }
      },
      iLike() {
          if (this.user.id != 0) {
            const likeParams = {
              topicType: CONSTANT_VIDEO,
              topicId:this.video.id,
              status: 1,
              liker:{
                id: this.user.id
              },
            }
            this.$store.dispatch(DISPATCH_COMMON_SETLIKESTATUS, likeParams)
            this.hasLiked = true
          } else {
            this.$store.dispatch(DISPATCH_COMMON_SHOWALERT, '登录后才能点赞喔~')
          }
      }
    }
  }
</script>

<style scoped>

  .icon {
    width: 32px;
    height: 32px;
    object-fit: cover;
  }

  .video-title {
    font-size: 20px;
    font-weight: bold;
  }

  .video-author {
    font-weight: bold;
  }

  .video-like {
    cursor: pointer;
  }

  .text-bold {
    font-weight: bold;
  }
</style>

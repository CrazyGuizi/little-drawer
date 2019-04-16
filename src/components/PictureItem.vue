<template>
  <b-card
    :title="title"
    :img-src="url"
    img-alt="趣图"
    img-top
    style="max-width: 20rem;"
    footer-tag="footer"
    class="mt-md-4 mb-4 ml-md-4 mr-md-4"
  >
    <b-card-text>

      <b-row class="align-items-center">
        <!--点赞-->
        <b-img class="icon icon-size" v-if="!liked" src="@/assets/images/unlike.png" @click="iLike"/>
        <b-img v-else class="icon-size" src="@/assets/images/like.png"/>
        <!--<span v-if="!liked" class="ml-2">{{like}}</span>-->
        <!--<span v-else class="ml-2">{{like + 1}}</span>-->

        <span v-if="!hasClickLike" class="ml-2">{{like}}</span>
        <span v-else class="ml-2">{{like + 1}}</span>

        <!--收藏-->
        <b-img class="icon icon-size ml-md-4" v-if="!collected" src="@/assets/images/uncollected.png"
               @click="iCollected"/>
        <b-img v-else class="icon-size ml-md-4" src="@/assets/images/collected.png"/>
        <!--<span v-if="!collected" class="ml-2">{{collections}}</span>-->
        <!--<span v-else class="ml-2">{{collections + 1}}</span>-->

        <span v-if="!hasClickCollection" class="ml-2">{{collections}}</span>
        <span v-else class="ml-2">{{collections + 1}}</span>
      </b-row>

    </b-card-text>
    <b-row class="align-items-center" slot="footer">
      <b-img-lazy class="author-icon" rounded="circle" :src="author.iconUrl" alt="作者"></b-img-lazy>
      <span class="author-name ml-md-2">{{author.nickName}}</span>
    </b-row>
    <span v-show="false">{{init}}这里使用init计算属性是为了让点赞和收藏状态根据props数据及时更新</span>
  </b-card>
</template>

<script>

  import {mapState} from "vuex";
  import {
    CONSTANT_PICTURE,
    DISPATCH_COMMON_ADDCOLLECTION,
    DISPATCH_COMMON_SETLIKESTATUS,
    DISPATCH_COMMON_SHOWALERT
  } from "../utils/constant";
  import * as Api from "../api/api";

  export default {
    name: "PictureItem",
    props: {
      id: {
        type: Number,
        default: 0
      },
      title: {
        type: String,
        default: '迷人的我又出现了'
      },
      url: {
        type: String,
        default: 'http://wx4.sinaimg.cn/mw690/6a04b428gy1g0gvw7k08kg20qo0qowt0.gif'
      },
      hasLiked: {
        type: Number,
        default: 0
      },
      like: {
        type: Number,
        default: 111
      },
      collections: {
        type: Number,
        default: 15
      },
      hasCollected: {
        type: Number,
        default: 0
      },

      author: {
        type: Object,
        default: function () {
          return {
            id: 7,
            nickName: "土小贵",
            iconUrl: "http://www.xinhuanet.com/world/2019-03/26/1124281341_15535500629521n.jpg"
          }
        }
      }
    },
    data() {
      return {
        liked: false,
        collected: false,
        pictureId: 0,
        hasClickLike: false,
        hasClickCollection: false
      }
    },
    computed: {
      ...mapState('user', ['user']),
      init: function () {

        this.hasClickLike = false
        this.hasClickCollection = false
        const param = {
          topicType: CONSTANT_PICTURE,
          topicId: this.id,
          userId: this.user.id
        }

        const vm = this
        Api.getLikeStatus(param, like => {
          vm.liked = like.status == 1
        }, errors => {
          vm.liked = false
        })

        Api.getCollectionStatus(param, c => {
          vm.collected = true
        }, e => {
          vm.collected = false
        })

        // 这里设置pictureId主要是为了辅助更新点赞和收藏的状态更新
        this.pictureId = this.id
        return 0
      }
    },
    methods: {
      iLike() {
        if (this.user.id !== 0) {
          const likeParams = {
            topicType: CONSTANT_PICTURE,
            topicId: this.id,
            liker: {
              id: this.user.id
            },
          }
          this.$store.dispatch(DISPATCH_COMMON_SETLIKESTATUS, likeParams)
          this.liked = true
          this.hasClickLike = true
        } else {
          this.$store.dispatch(DISPATCH_COMMON_SHOWALERT, '登录后才能点赞喔~')
        }
      },
      iCollected() {
        if (this.user.id !== 0) {
          const params = {
            topicType: CONSTANT_PICTURE,
            topicId: this.id,
            collector: {
              id: this.user.id
            },
          }
          this.$store.dispatch(DISPATCH_COMMON_ADDCOLLECTION, params)
          this.collected = true
          this.hasClickCollection = true
        } else {
          this.$store.dispatch(DISPATCH_COMMON_SHOWALERT, '登录后才能收藏喔~')
        }
      }
    },

  }
</script>

<style scoped>
  .icon {
    cursor: pointer;
    object-fit: cover;
  }

  .icon-size {
    width: 32px;
    height: 32px;
  }

  .author-icon {
    width: 35px;
    height: 35px;
    object-fit: cover;
  }

  .author-name {
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>

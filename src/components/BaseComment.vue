<template>
  <b-container>
    <b-row>
      <!--头像-->
      <b-col class="col-md-1">
        <b-img-lazy class="icon" v-bind="mainProps" :src="fromUser.iconUrl" rounded="circle"/>
      </b-col>
      <!--评论展示-->
      <b-col>
        <span class="nick-name">{{fromUser.nickName}}</span>
        <span v-show="toUser != null && JSON.stringify(toUser) != '{}'">
          &nbsp;回复&nbsp;
         <span class="nick-name">
           {{toUser.nickName}}
         </span></span>
        <span class="date">{{date}}</span>
        <p class="content">{{content}}
          <span class="more-reply" v-show="replys != null && replys.length > 0" @click="seeComments">{{isShowMore ? '收起回复' : '查看回复'}}({{replys.length}})</span>
          <span class="report" @click="report(id)">举报</span>
          <span class="reply" @click="isReply = !isReply">{{isReply ? '取消': '回复'}}</span>
        </p>
      </b-col>
    </b-row>
    <b-row>
      <!--占位-->
      <b-col class="col-md-1"/>
      <transition name="fade">
        <b-col class="show-more" v-show="isShowMore">
          <BaseComment v-show="replys != null && replys.length > 0" v-for="(reply, index) in replys" :key="index"
                       v-bind="reply"/>
        </b-col>
      </transition>
    </b-row>
    <!--回复编辑区-->
    <b-row v-show="isReply">
      <SimpleEditor ref="refSimpleEditor" class="mt-2 mb-2" @commit="commit"/>
    </b-row>
  </b-container>
</template>

<script>

  import SimpleEditor from "./SimpleEditor";
  import {
    CONSTANT_NEWS,
    CONSTANT_NUM_0, CONSTANT_NUM_1,
    CONSTANT_VIDEO,
    DISPATCH_COMMON_SENDREPLY,
    KEY_NEWS_REPLY,
    KEY_USER
  } from "../utils/constant";
  import {isContainedSensitiveWord, showAlert} from "../utils/func";
  import {mapState} from "vuex";

  export default {
    name: "BaseComment",
    components: {SimpleEditor},
    props: {
      id: {
        type: Number,
        default: 0
      },
      commentId: {
        type: Number,
        default: 0
      },
      fromUser: {
        type: Object,
        default: function () {
          return {
            nickName: "土小贵",
            iconUrl: "http://www.e4221.com/uploads/allimg/180606/aaa.jpg"
          }
        }
      },
      toUser: {
        type: Object,
        default: function () {
          return {
          }
        }
      },
      content: {
        type: String,
        default: '我觉得此事必有蹊跷'
      },
      date: {
        type: String,
        default: '2019年3月31日12:23:13'
      },
      replys: {
        type: Array,
        default: function () {
          return []
        }
      }

    },
    data() {
      return {
        mainProps: {blank: true, width: 45, height: 45, class: 'm1'},
        isShowMore: false,
        replyContent:'',
        isReply: false
      }
    },
    methods: {
      seeComments() {
        this.isShowMore = !this.isShowMore
      },
      commit(content) {
        const user = this.$store.state.user.user
        if (user.id == 0) {
          showAlert(this, '请先登录')
          return
        }

        if (isContainedSensitiveWord(content)) {
          showAlert(this, '内容含有敏感内容，请修改后再发布')
          return
        }

        const params = {
          content: content,
          replyId: this.id,
          fromUser:{
            id:user.id
          },
          toUser:{
            id:this.fromUser.id
          }
        }

        // 这一条是回复回复的回复
        if (this.toUser != null && JSON.stringify(this.toUser) != '{}') {
          params.replyType = CONSTANT_NUM_1
          params.commentId = this.commentId
        } else {
          // 这是一条回复评论的回复
          params.replyType = CONSTANT_NUM_0
          params.commentId = this.id
        }

        // 暂时没解决向祖宗发送事件的问题，所以用本地缓存
        // localStorage.setItem(KEY_NEWS_REPLY, JSON.stringify(params))
        // this.$emit('commit')
        // const commentType = this.$store.state.common.commentType;
        // switch (commentType) {
        //   case CONSTANT_NEWS:
        //     this.sendReply(params)
        //     break
        // }
        this.$store.dispatch(DISPATCH_COMMON_SENDREPLY, params)
        this.$refs.refSimpleEditor.content = ''
        if (!this.isShowMore) {
          this.isShowMore = !this.isShowMore
        }
      },
      sendReply: function(params) {
        this.$store.dispatch(DISPATCH_COMMON_SENDREPLY, params)
      },
      report() {
        alert(id)
      }
    }
  }
</script>


<style scoped>
  .icon {
    object-fit: cover;
  }

  .nick-name {
    font-weight: bold;
  }

  .date {
    margin-left: 8px;
    color: #999999;
    font-size: 12px;
  }

  .more-reply {
    font-size: 14px;
    color: #79a5e5;
    margin-left: 8px;
    cursor: pointer;
  }

  .report {
    font-size: 14px;
    color: #79a5e5;
    margin-left: 8px;
    cursor: pointer;
  }

  .reply {
    font-size: 14px;
    color: #79a5e5;
    margin-left: 8px;
    cursor: pointer;
  }

  .show-more {
    border-left: 2px solid #4E5465;
  }


  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
  }
</style>

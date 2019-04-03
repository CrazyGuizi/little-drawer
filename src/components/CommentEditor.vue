<template>
  <b-container>
    <b-row class="align-items-md-center">
      <!--头像-->
      <b-col class="col-md-2 text-center">
        <b-img-lazy class="icon" v-bind="mainProps" :src="iconUrl" rounded="circle" alt="头像"/>
      </b-col>
      <!--评论-->
      <b-col class="col-md-8">
        <b-form-textarea
          id="textarea"
          v-model="content"
          placeholder="这位爷，您怎么看..."
          rows="3"
          max-rows="6"
        ></b-form-textarea>
      </b-col>
      <!--发表-->
      <b-col class="col-md-2">
        <b-button variant="primary" :disabled="isCommentNull" @click="$emit('commit', content)">发表</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>

  import {mapState} from 'vuex'
  import {KEY_USER} from "@/utils/constant";
  export default {
    name: "CommentEditor",
    data() {
      return {
        mainProps: { blank: true, width: 45, height: 45, class: 'm1' },
        content:''
      }
    },
    computed:{
      ...mapState('user',{
        iconUrl: state => state.user.iconUrl
      }),
      isCommentNull() {
        const c = this.content
        if (c.toString().replace(/\s+/g, "") == '') {
          return true
        }
        return false
      }
    }
  }
</script>

<style scoped>

  .icon {
    object-fit: cover;
  }
</style>

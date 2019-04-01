<template>
  <b-container>
    <b-row class="align-items-md-center">
      <!--编辑内容-->
      <b-col class="col-md-8">
        <b-form-textarea
          id="textarea"
          v-model="content"
          placeholder="..."
          rows="2"
          max-rows="4"
        ></b-form-textarea>
      </b-col>
      <!--发送-->
      <b-col class="col-md-2">
        <b-button variant="primary" :disabled="isCommentNull" @click="$emit('commit', content)">发送</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>

  import {mapState} from 'vuex'
  import {KEY_USER} from "@/utils/constant";
  export default {
    name: "SimpleEditor",
    data() {
      return {
        mainProps: { blank: true, width: 45, height: 45, class: 'm1' },
        content:''
      }
    },
    computed:{
      ...mapState('user',{
        iconUrl: state => state.iconUrl
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

</style>

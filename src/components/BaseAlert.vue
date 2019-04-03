<template>
  <b-modal :visible="isShowAlert" centered hide-footer hide-header-close title="提示">
    <div class="d-block">
      <h5>{{msg}}</h5>
    </div>
    <b-button class="mt-4" variant="outline-info" block @click="close">确定</b-button>
  </b-modal>
</template>

<script>
  import {mapState, mapActions} from 'vuex'

  export default {
    name: "BaseAlert",
    computed: {
      ...mapState('common', {
        isShowAlert: 'isShowAlert',
        msg: 'alertMsg'
      })
  },
    methods:{
      ...mapActions('common',{
        close: 'closeAlert'
      })
    }
  }
</script>

<style scoped>


</style>

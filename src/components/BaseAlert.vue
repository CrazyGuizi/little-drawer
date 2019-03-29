<template>

  <b-alert
    class="alert"
    :show="dismissCountDown"
    dismissible
    variant="warning"
    @dismissed="dismissCountDown=0"
    @dismiss-count-down="countDownChanged">
    <p class="msg">{{msg}}</p>
    <b-progress class="progress" variant="warning" :max="dismissSecs" :value="dismissCountDown" height="4px" />
  </b-alert>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: "BaseAlert",
    props: {
      dismissSecs: {
        type:Number,
        default:3
      },
      dismissCountDown: {
        type:Number,
        default: 0
      },
    },
    data() {
      return {
      }
    },
    computed: mapState({
      msg:state => state.common.alertMsg
    }),
    methods: {
      countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },
      showAlert() {
        this.dismissCountDown = this.dismissSecs
      }
    }
  }
</script>

<style scoped>

  .alert {
    position: absolute;
    left: 40%;
    top: 50%;
    text-align: center;
    width: 500px;
  }

  .msg {
    width: auto;
  }

  .progress {
    width: auto;
  }
</style>

<template>
  <div>
    <img id="nav-icon" :src="icon" :alt="alt" :width="width" :height="height">
    <b-button id="nav-btn" :variant="color" :value="name" @click="$emit('changeTab')">{{name}}</b-button>
  </div>
</template>

<script>
  export default {
    name: "NewsNav",
    props: {
      icon: {
        type:String,
        default() {
          return 'http://q.qlogo.cn/qqapp/208656/2B6C8829139AE9CFDC16D2866092BD8B/100'
        }
      },
      alt: {
        type:String,
        default() {
          return '科技'
        }
      },
      width:{
        type:Number,
        default:function () {
          return 32
        }
      },height:{
        type:Number,
        default:function () {
          return 32
        }
      },
      name:String,
      color:{
        type:String,
        default: function() {
          return 'outline-primary'
        }
      },
      btnStyle: {
        type:Object
      }
    },
    methods:{
      commit:function() {}
    }
  }
</script>

<style scoped>

  div {
    margin-top: 10px;
  }

  #nav-icon {
    object-fit: cover;
    margin-left: 10%;
  }

  #nav-btn {
    margin-right: 10%;
    margin-left: 10%;
    width: 60%;
  }

</style>

<template>
  <div class="login-register">
    <p>{{title}}</p>
    <form>
      <input type="text" v-model="username">
      <input type="password" v-model="password">
      <input v-show="!isLogin" type="password" v-model="passwordAgain">
    </form>
    <button @click="isLogin = !isLogin">{{isLogin ? '去注册' : "去登录"}}</button>
    <button id="commit" @click="commit">{{isLogin ?  "登录": '注册'}}</button>
  </div>


</template>

<script>
  export default {
    name: "LoginAndRegister",
    props: {
      title: String,
      username:String,
      password:String,
      passwordAgain:String,
      isLogin:Boolean
    },
    methods: {
      commit() {}
    }
  }
</script>

<style scoped>

</style>

<template>
  <div>
    <div id="nav">

      <a class="logo" href="/news"><img src="@/assets/logo.png" alt="logo"></a>

      <router-link to="/news">新闻</router-link>
      <router-link to="/video">视频</router-link>
      <router-link to="/picture">趣图</router-link>
      <!--<router-link to="/novel">小说</router-link>-->

      <!--<b-nav-form id="search">-->
      <!--<b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>-->
      <!--<b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>-->
      <!--</b-nav-form>-->

      <b-img-lazy v-if="iconUrl == defaultIcon" class="loginImg" :src="iconUrl"
                  v-b-modal.loginRegister v-bind="loginProps" rounded="circle" alt="登录/注册"/>

      <b-img v-else class="loginImg" :src="iconUrl"
             @click="toPerson" v-bind="loginProps" rounded="circle" alt="个人中心"/>

      <!--<router-link v-else to="/person" class="router-person">-->
      <!--<b-img-lazy  :src="iconUrl"-->
      <!--v-bind="loginProps" rounded="circle" alt="个人中心"/>-->
      <!--</router-link>-->

      <!-- The modal -->
      <b-modal id="loginRegister"
               centered
               hide-footer
               ref="loginModalRef"
               :title="title"
               :header-bg-variant="modalData.headerBgVariant"
               :header-text-variant="modalData.headerTextVariant">

        <b-container class="login-register-container">
          <b-form @submit="commit" action="/video" method="">
            <div v-if="account.isLogin">
              <b-form-group>
                <b-form-input required type="text" placeholder="账号" v-model="account.username"/>
              </b-form-group>
              <b-form-group>
                <b-form-input required type="password" placeholder="密码" v-model="account.password"/>
                <b-form-invalid-feedback :state="account.loginStatus">
                  {{account.loginMsg}}
                </b-form-invalid-feedback>
              </b-form-group>
              <b-button size="sm" class="float-right" variant="link" @click="account.isLogin = !account.isLogin">去注册
              </b-button>
            </div>

            <div v-else>
              <b-form-group>
                <b-form-input required type="text" placeholder="昵称" v-model="account.nickName"/>
                <b-form-invalid-feedback :state="validateNickName">
                  昵称不能包含空格
                </b-form-invalid-feedback>
              </b-form-group>
              <b-form-group>
                <b-form-input required type="text" placeholder="账号(5到20位的字母和数字组合)" v-model="account.regUsername"/>
                <b-form-invalid-feedback :state="validateUsername">
                  格式不正确，请输入5到20位的字母数字组合
                </b-form-invalid-feedback>
                <b-form-invalid-feedback :state="account.accountDontExit">
                  账号已存在
                </b-form-invalid-feedback>
              </b-form-group>
              <b-form-group>
                <b-form-input required type="password" placeholder="密码" v-model="account.regPassword"/>
              </b-form-group>
              <b-form-group>
                <b-form-input required type="password"
                              placeholder="请再次输入密码" v-model="account.regPasswordAgain"/>
                <b-form-invalid-feedback :state="validatePassword">
                  密码不一致
                </b-form-invalid-feedback>
              </b-form-group>
              <b-button size="sm" class="float-right" variant="link" @click="account.isLogin = !account.isLogin">去登录
              </b-button>
            </div>

            <div class="d-block text-center">
              <b-button block size="sm" type="submit" variant="primary">{{account.isLogin ? '登录' : '注册'}}</b-button>
            </div>

          </b-form>

        </b-container>

      </b-modal>
    </div>

    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>

    <Footer/>
  </div>

</template>

<script>

  import Footer from "@/components/Footer";
  import {log} from '../utils/log-util'
  import * as Api from '@/api/api'
  import * as Types from '../vuex/types'
  import {mapState} from 'vuex'
  import {NAMESPACE_USER} from "@/utils/constant";

  export default {
    name: 'Home',
    data() {
      return {
        loginProps: {
          width: 32, height: 32, class: 'm1'
        },
        defaultIcon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBp9Eucf5jhyiT37463w8DTw3IYyqxKcWJZLXYcbBdMVd6kYaA',
        modalData: {
          headerBgVariant: 'dark',
          headerTextVariant: 'light',
          bodyBgVariant: 'light',
          bodyTextVariant: 'dark',
          footerBgVariant: 'warning',
          footerTextVariant: 'dark',
        },
        account: {
          isLogin: true,
          isOnline: false,
          nickName: '',
          username: '',
          password: '',
          regUsername: '',
          regPassword: '',
          regPasswordAgain: '',
          accountDontExit: true,
          loginStatus: true,
          loginMsg: ''
        },
      }
    },
    components: {
      Footer,
    },
    watch: {
      'account.regUsername': function (newVal, oldVal) {
        const vm = this;
        if (new RegExp('^[a-zA-Z0-9]{5,20}$').test(newVal)) {
          log('验证用户名是否存在')
          // 数据每次触发都会去执行，后面可以优化一下
          Api.validateUsername(this.account.regUsername, data => {
            // 返回数据说明用户已经存在
            log('执行了false')
            vm.account.accountDontExit = false
          }, errors => {
            log('执行了true')
            vm.account.accountDontExit = true
          })
        } else {
          vm.account.accountDontExit = true
        }
      }
    },
    computed: {
      ...mapState('user', {
        iconUrl: state => state.user.iconUrl
      }),
      title() {
        return this.account.isLogin ? '登录' : '注册'
      },
      validateNickName() {
        return !/\s+/.test(this.account.nickName)
      },
      validateUsername() {
        const u = this.account.regUsername;
        if (u == undefined || u == null || u == '') {
          return
        } else {
          let regExp = new RegExp('^[a-zA-Z0-9]{5,20}$');
          return regExp.test(u)
        }
      },
      validatePassword() {
        const regPassIsNull = this.account.regPassword == undefined || this.account.regPassword == null ||
          this.account.regPassword.toString().trim() == '';
        const regPassAgainIsNull = this.account.regPasswordAgain == undefined ||
          this.account.regPasswordAgain == null || this.account.regPasswordAgain.toString().trim() == '';
        if (regPassIsNull || regPassAgainIsNull) {
          // 只要一个为空就不验证
          return
        } else if (regPassIsNull || regPassAgainIsNull) {
          log('请将密码填写完整')
          return false
        } else {
          if (this.account.regPassword !== this.account.regPasswordAgain) {
            log('密码不一致' + this.account.regPassword + "\t" + this.account.regPasswordAgain)
            return false
          } else {
            log('密码一致' + this.account.regPassword)
            return true
          }
        }
      }
    },
    methods: {
      commit(evt) {
        evt.preventDefault()
        const vm = this
        // 登录操作
        if (this.account.isLogin) {
          log('登录')
          const u = this.account.username;
          const p = this.account.password;
          const params = {username: u, password: p}

          Api.login(params, data => {
            // 存储
            this.$store.commit(NAMESPACE_USER + Types.USER_SET_USER, data)
            vm.account.loginMsg = data
            log('登录成功')
            vm.account.loginStatus = true
            this.$refs.loginModalRef.hide()
            // this.$router.push('/person')
          }, errors => {
            log('账号密码出错')
            vm.account.loginStatus = false
            vm.account.loginMsg = errors
          })

        } else {
          // 注册
          log('注册')
          if (/\s+/.test(this.account.nickName)) {
            log('昵称不符合')
            return
          }

          if (!new RegExp('^[a-zA-Z0-9]{5,20}$').test(this.account.regUsername)) {
            log('用户名格式不符合')
            return
          }

          if (!this.account.accountDontExit) {
            log('用户已存在')
            return

          }
          if (this.account.regPassword !== this.account.regPasswordAgain) {
            log('两次密码不一致')
            return
          }

          const params = {
            nickNme: this.account.nickName,
            username: this.account.regUsername,
            password: this.account.regPassword,
          }
          Api.register(params, user => {
            this.$store.commit(NAMESPACE_USER + Types.USER_SET_USER, user)

            log('注册成功')
            this.$refs.loginModalRef.hide()
            this.$router.push('/person')
          }, errors => {
            log('注册失败')
          })
        }
      },
      toPerson() {
        this.$router.push({path: '/person'})
      }
    }
  }
</script>

<style lang="scss">

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  .logo {
    img {
      width: 48px;
      height: 48px;
    }

  }

  #nav {
    margin: 0px;
    background-color: #1976D2;
    padding-top: 30px;
    padding-bottom: 30px;

    a {
      font-weight: bold;
      color: white;
      margin-left: 40px;
      margin-right: 40px;

      &.router-link-exact-active {
        color: #42b983;
      }
    }

  }

  #search {
    display: inline;
    margin-left: 20%;
  }

  #login {
    position: absolute;
    left: 5px;
  }

  .router-person {
    display: inline-block;
    margin-left: 600px;
  }

  /*.router-person b-img-lazy {*/
  /*cursor: pointer;*/
  /*object-fit: cover;*/
  /*}*/

  .loginImg {
    cursor: pointer;
    margin-left: 56px;
    object-fit: cover;
  }

  #login-register-container {

    b-form-input {
      margin: 24px;
    }
  }
</style>

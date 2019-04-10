<template>
  <div class="navbar">
    <Hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    <Breadcrumb/>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img :src="user.iconUrl" class="user-avatar">
        <i class="el-icon-caret-bottom"/>
      </div>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            首页
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span style="display:block;" @click="logout">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>

  import {mapGetters, mapState} from "vuex";
  import Hamburger from  './Hamburger'
  import Breadcrumb from "./Breadcrumb";
  import {DISPATCH_PERSON_TOGGLESIDEBAR, DISPATCH_USER_LOGOUT} from "../../utils/constant";
  export default {
    name: "Navbar",
    components: {Breadcrumb, Hamburger},
    computed: {
      ...mapState('user', ['user']),
      ...mapState('person', ['sidebar'])
    },
    methods:{
      toggleSideBar() {
        this.$store.dispatch(DISPATCH_PERSON_TOGGLESIDEBAR)
      },
      logout() {
        this.$store.dispatch(DISPATCH_USER_LOGOUT)
        this.$router.push({path:'/'})
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    height: 50px;
    line-height: 50px;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,.12), 0 0 3px 0 rgba(0,0,0,.04);
    .hamburger-container {
      line-height: 58px;
      height: 50px;
      float: left;
      padding: 0 10px;
    }
    .screenfull {
      position: absolute;
      right: 90px;
      top: 16px;
      color: red;
    }
    .avatar-container {
      height: 50px;
      display: inline-block;
      position: absolute;
      right: 35px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        line-height: initial;
        .user-avatar {
          width: 40px;
          height: 40px;
          object-fit: cover;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
</style>

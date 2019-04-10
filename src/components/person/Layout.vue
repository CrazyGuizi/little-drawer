<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
    <Sidebar class="sidebar-container"/>
    <div class="main-container">
      <Navbar/>
      <AppMain/>
    </div>
  </div>
</template>

<script>
  import Sidebar from "./Sidebar";
  import Navbar from "./Navbar";
  import AppMain from "./AppMain";
  import {mapState} from 'vuex'
  import {DISPATCH_PERSON_CLOSESIDEBAR} from "../../utils/constant";
  export default {
    name: "Layout",
    components: {AppMain, Navbar, Sidebar},
    computed: {
      ...mapState('person', ['sidebar']),
      classObj() {
        return {
          hideSidebar: !this.sidebar.opened,
          openSidebar: this.sidebar.opened,
          withoutAnimation: this.sidebar.withoutAnimation,
          mobile: this.device === 'mobile'
        }
      }
    },
    methods: {
      handleClickOutside() {
        this.$store.dispatch(DISPATCH_PERSON_CLOSESIDEBAR, { withoutAnimation: false })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/assets/styles/mixin.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
</style>

<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :default-active="$route.path"
      :collapse="isCollapse"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText"
      :collapse-transition="false"
      mode="vertical"
    >
      <SidebarItem v-for="route in routes" :key="route.path" :item="route" :base-path="route.path"/>
    </el-menu>
  </el-scrollbar>
</template>

<script>
  import SidebarItem from "./SidebarItem";
  import variables from '@/assets/styles/variables.scss'
  import {mapState} from 'vuex'

  export default {
    name: "Sidebar",
    components: {SidebarItem},
    computed: {
      ...mapState('person',[
        'sidebar'
      ]),
      routes() {
        return this.$router.options.routes
      },
      variables() {
        return variables
      },
      isCollapse() {
        return !this.sidebar.opened
      }
    }
  }
</script>

<style scoped>

</style>

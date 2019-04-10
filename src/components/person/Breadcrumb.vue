<template>
  <el-breadcrumb class="app-breadcrumb" separator-class="el-icon-arrow-right">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span v-if="item.redirect === 'noreddirect' || index == levelList.length - 1" class="no-redirect">
          {{item.meta.title}}
        </span>
        <a v-else @click.prevent="handleLink(item)">{{item.meta.title}}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>

  import pathToRegexp from 'path-to-regexp'

  export default {
    name: "Breadcrumb",
    data() {
      return {
        levelList: null
      }
    },
    watch: {
      $route() {
        this.getBreadcrumb
      }
    },
    created() {
      this.getBreadcrumb
    },
    methods: {
      getBreadcrumb() {
        let routeRecords = this.$route.matched.filter(item => item.name);
        const first = routeRecords[0]
        if (first && first.name !== 'index') {
          routeRecords = [{path: '/person/index', meta: {title: '欢迎'}}].concat(routeRecords)
        }
        this.levelList = routeRecords.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
      },
      pathCompile(path) {
        const {params} = this.$route
        const toPath = pathToRegexp.compile(path);
        return toPathp(params)
      },
      handleLink(item) {
        const {redirect, path} = item
        if (redirect) {
          this.$router.push(redirect)
          return
        } else {
          this.$router.push(this.pathCompile(path))
        }
      }
    }

  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;

    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>

<template>
  <b-container>

    <el-dropdown @command="getComments" class="mt-md-4">
      <el-button type="primary">
        选择文章<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="(news,index) in myNews" :key="index" :command="news.id">
          {{news.title}}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <span class="ml-md-4">{{currentNewsTitle}}</span>

    <el-table
      class="mt-md-4"
      :data="comments.slice((currentPage - 1)* pageSize, currentPage * pageSize)"
      stripe
      style="width: 100%">
      <el-table-column
        type="index"
        prop="id">
      </el-table-column>
      <el-table-column
        prop="date"
        label="日期"
        width="160">
      </el-table-column>
      <el-table-column
        prop="content"
        label="内容">
      </el-table-column>
      <el-table-column
        prop="fromUser.nickName"
        label="发布者"
        width="180">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="mt-md-4 text-center"
      background
      :total="comments.length"
      @current-change="currentChange">
    </el-pagination>
  </b-container>
</template>

<script>
  import Api from '@/api/api'
  import {mapState} from "vuex";
  import {
    CONSTANT_NEWS,
    DISPATCH_COMMON_DELETECOMMENT, DISPATCH_COMMON_DELETEREPLY,
    DISPATCH_COMMON_GETCOMMENTSBYTYPE,
    DISPATCH_NEWS_GETMYNEWS
  } from "../../../utils/constant";

  export default {
    name: "Comment",
    data() {
      return {
        pageSize: 10,
        currentPage: 1,
        currentNewsId:0,
        currentNewsTitle:''
      }
    },
    mounted() {

      this.$store.dispatch(DISPATCH_NEWS_GETMYNEWS)

      const vm = this
      // 不想回调 所以用延时等待数据
      setTimeout(() => {
        vm.currentNewsId = this.myNews[0].id
        vm.currentNewsTitle = this.myNews[0].title
        vm.$store.dispatch(DISPATCH_COMMON_GETCOMMENTSBYTYPE, {
          topicType: CONSTANT_NEWS,
          topicId: vm.currentNewsId,
        })
      },500)

    },
    computed: {
      ...mapState('news', ['myNews']),
      ...mapState('common', ['comments']),
    },
    methods: {
      currentChange(currentPage) {
        this.currentPage = currentPage
      },
      getComments(newsId) {
        this.currentNewsId = newsId
        for (let i = 0; i < this.myNews.length; i++) {
          if(this.myNews[i].id == newsId) {
            this.currentNewsTitle = this.myNews[i].title;
            break
          }
        }

        this.$store.dispatch(DISPATCH_COMMON_GETCOMMENTSBYTYPE, {
          topicType: CONSTANT_NEWS,
          topicId: newsId,
        })
      },
      handleDelete(index, comment) {
        const vm = this
        this.$confirm('此操作将删除该评论, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: "warning"
        }).then(() => {
          if (comment.toUser == null || comment.toUser == undefined) {
            // 删除的是评论
            vm.$store.dispatch(DISPATCH_COMMON_DELETECOMMENT, {commentId:comment.id})
          } else if (comment.type == 1) {
            // 删除的是回复
            vm.$store.dispatch(DISPATCH_COMMON_DELETEREPLY, {replyId:comment.id})
          }
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    }
  }
</script>

<style scoped>

</style>

<template>
  <h5 v-if="user.id != 1" class="mt-md-4">你不是超级管理员喔~</h5>

  <b-container v-else>

    <el-table
      class="mt-md-4"
      :data="reportList.slice((currentPage - 1)* pageSize, currentPage * pageSize)"
      stripe
      style="width: 100%">
      <el-table-column
        type="index"
        prop="id">
      </el-table-column>
      <el-table-column
        prop="reporter.nickName"
        label="举报者">
      </el-table-column>
      <el-table-column
        prop="topicId"
        label="举报ID">
      </el-table-column>
      <el-table-column
        prop="topicName"
        label="类别">
      </el-table-column>
      <el-table-column
        prop="reason"
        label="举报理由">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleAccept(scope.$index, scope.row)">采纳
          </el-button>

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
      :total="reportList.length"
      @current-change="currentChange">
    </el-pagination>
  </b-container>
</template>

<script>

  import {mapState} from "vuex"
  import {
    DISPATCH_COMMON_ACCEPTREPORT,
    DISPATCH_COMMON_DELETEREPORT,
    DISPATCH_COMMON_GETALLREPORTS
  } from "../../../utils/constant";

  export default {
    name: "SuperAdmin",
    data() {
      return {
        pageSize: 10,
        currentPage: 1
      }
    },
    mounted() {
      this.$store.dispatch(DISPATCH_COMMON_GETALLREPORTS)
    },
    computed: {
      ...mapState('user', ['user']),
      ...mapState('common', {
        reportList: 'reports'
      })
    },
    methods: {
      currentChange(currentPage) {
        this.currentPage = currentPage
      },
      handleAccept(index, report) {
        const vm = this
        this.$confirm('此操作将采纳举报行为，举报的内容（如评论、回复）将被删除, 是否继续?', '提示',{
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:"warning"
        }).then(() => {
          const params = {
            topicName:report.topicName,
            topicId:report.topicId
          }
          vm.$store.dispatch(DISPATCH_COMMON_ACCEPTREPORT, params)
          this.$message({
            type: 'success',
            message: '操作成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      },
      handleDelete(index, report) {
        const vm = this
        this.$confirm('此操作将永久删除该举报, 是否继续?', '提示',{
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:"warning"
        }).then(() => {
          const params = {
            reportId:report.id
          }
          vm.$store.dispatch(DISPATCH_COMMON_DELETEREPORT, params)
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

<template>
  <b-container>
    <el-table
      class="mt-md-4"
      :data="newsList.slice((currentPage - 1)* pageSize, currentPage * pageSize)"
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
        prop="title"
        label="标题">
      </el-table-column>
      <el-table-column
        prop="column"
        label="分类"
        width="180">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="getNewsDetail(scope.row.id)"
            >查看</el-button>
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>

          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="mt-md-4 text-center"
      background
      :total="newsList.length"
    @current-change="currentChange">
    </el-pagination>
  </b-container>
</template>

<script>
  import {mapState} from "vuex";
  import {DISPATCH_NEWS_DELETENEWSBYID, DISPATCH_NEWS_GETMYNEWS} from "@/utils/constant";
  import {getNewsDetail} from "@/utils/func";

  export default {
    name: "Article",
    data() {
      return {
        pageSize:10,
        currentPage:1
      }
    },
    computed:{
      ...mapState('news', {
        newsList: 'myNews'
      })
    },
    mounted() {
      this.$store.dispatch(DISPATCH_NEWS_GETMYNEWS)
    },
    methods: {
      getNewsDetail,
      currentChange(currentPage) {
        this.currentPage = currentPage
      },
      handleEdit(index, news) {
        console.log(index, news);
      },
      handleDelete(index, news) {
        const vm = this
        this.$confirm('此操作将永久删除该新闻, 是否继续?', '提示',{
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:"warning"
        }).then(() => {
          const params = {
            newsId:news.id
          }
          vm.$store.dispatch(DISPATCH_NEWS_DELETENEWSBYID, params)
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

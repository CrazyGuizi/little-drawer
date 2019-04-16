<template>
  <b-container>
    <el-table
      class="mt-md-4"
      :data="myVideos.slice((currentPage - 1)* pageSize, currentPage * pageSize)"
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
        prop="typeName"
        label="分类"
        width="180">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="getVideoDetail(scope.row.id)"
          >查看</el-button>
          <!--<el-button-->
            <!--size="mini"-->
            <!--@click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->

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
      :total="myVideos.length"
      @current-change="currentChange">
    </el-pagination>
  </b-container>
</template>

<script>
  import {mapState} from "vuex";
  import {
    DISPATCH_VIDEO_DELETEVIDEOBYID,
    DISPATCH_VIDEO_GETVIDEOSBYUSERID
  } from "../../../utils/constant";
  import {getVideoDetail} from "@/utils/func";

  export default {
    name: "MyVideo",
    data() {
      return {
        pageSize:10,
        currentPage:1
      }
    },
    computed:{
      ...mapState('video', ['myVideos'])
    },
    mounted() {
      this.$store.dispatch(DISPATCH_VIDEO_GETVIDEOSBYUSERID)
    },
    methods: {
      getVideoDetail,
      currentChange(currentPage) {
        this.currentPage = currentPage
      },
      handleEdit(index, video) {
        console.log(index, video);
      },
      handleDelete(index, video) {
        const vm = this
        this.$confirm('此操作将永久删除该视频, 是否继续?', '提示',{
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:"warning"
        }).then(() => {
          const params = {
            videoId:video.id
          }
          vm.$store.dispatch(DISPATCH_VIDEO_DELETEVIDEOBYID, params)
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

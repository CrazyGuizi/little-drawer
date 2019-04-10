<template>
  <b-container>
    <el-table
      class="mt-md-4"
      :data="myPictures.slice((currentPage - 1)* pageSize, currentPage * pageSize)"
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
        prop="like"
        label="点赞数">
      </el-table-column>
      <el-table-column
        prop="collections"
        label="收藏数">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-popover
            placement="left"
            width="100"
            trigger="click">
            <b-img-lazy class="picture-small" :src="scope.row.url"/>
            <el-button
              size="mini"
              slot="reference">查看</el-button>
          </el-popover>


          <el-button
            class="ml-md-5"
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
      :total="myPictures.length"
      @current-change="currentChange">
    </el-pagination>
  </b-container>
</template>

<script>
  import {mapState} from "vuex";
  import {
    DISPATCH_PICTURE_DELETEPICTUREBYID,
    DISPATCH_PICTURE_GETPICTURESBYUSERID,
  } from "@/utils/constant";
  import {getVideoDetail} from "@/utils/func";

  export default {
    name: "MyPicture",
    data() {
      return {
        pageSize: 10,
        currentPage: 1
      }
    },
    computed: {
      ...mapState('picture', ['myPictures'])
    },
    mounted() {
      this.$store.dispatch(DISPATCH_PICTURE_GETPICTURESBYUSERID)
    },
    methods: {
      currentChange(currentPage) {
        this.currentPage = currentPage
      },
      handleEdit(index, picture) {
        console.log(index, picture);
      },
      handleDelete(index, picture) {
        const vm = this
        this.$confirm('此操作将永久删除该图片, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: "warning"
        }).then(() => {
          const params = {
            id: picture.id
          }
          vm.$store.dispatch(DISPATCH_PICTURE_DELETEPICTUREBYID, params)
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

  .picture-small {
    width: 100px;
    height: 100px;
    object-fit: cover;
  }

</style>

<template>
  <b-container class="mt-md-4">
    <el-form ref="picture-form" :model="picture" :rules="rules" label-width="120px">
      <el-form-item label="图片标题" prop="title">
        <el-input v-model="picture.title"/>
      </el-form-item>
      <el-form-item label="上传图片" prop="url">
        <el-upload
          ref="uploadPicture"
          action="http://192.168.43.3:8080/upload/picture"
          :before-upload="beforePictureUpload"
          :on-success="handlePictureSuccess"
          :on-remove="handlePictureRemove"
          :limit="1"
          list-type="picture">
          <el-button size="small" type="primary">上传图片</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="publish('picture-form')">提交</el-button>
      </el-form-item>
    </el-form>
  </b-container>
</template>

<script>
    import {mapState} from "vuex";
    import {isContainedSensitiveWord} from "../../../utils/func";
    import {addPicture} from "../../../api/api";

    export default {
        name: "PublishPicture",
      data() {
          return {
            picture:{
              title:'',
              url:''
            },
            rules:{
              title:[{required:true, message: '请输入图片的标题', triangle: 'blur'}],
              url:[{required:true, message: '请上传图片', triangle: 'blur'}]
            }
          }
      },
      computed:{
          ...mapState('user', ['user'])
      },
      methods: {
        handlePictureRemove(file, fileList) {
          this.picture.url = ''
        },
        handlePictureSuccess(response, file, fileList) {
          this.picture.url = fileList[0].response.data.picture.src
        },
        handlePictureRemove(file, fileList) {
          this.picture.source = ''
        },
        beforePictureUpload(file) {
          const type = file.type
        },
        publish(formName) {
          this.$refs[formName].validate((valit) => {
            if (valit) {
              if (isContainedSensitiveWord(this.picture.title)) {
                this.$message({type: 'warning', message: '标题含有敏感词'})
              } else {
                const params = {
                  picture: this.picture,
                  userId: this.user.id
                }
                console.log(params)
                const vm = this
                addPicture(params, picture => {
                    vm.$message({type: 'success', message: '发布成功'})
                    vm.resetForm(formName)
                  },
                  e => {
                    vm.$message({type: 'error', message: '发布失败'})
                  })
              }
            } else {
              return false
            }
          })
        },
        resetForm(formName) {
          this.$refs[formName].resetFields()
          this.$refs['uploadPicture'].clearFiles()
          // this.picture.url = ''
        }
      }
    }
</script>

<style scoped>

</style>

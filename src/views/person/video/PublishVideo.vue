<template>
  <b-container class="mt-md-4">
    <el-form ref="video-form" :model="video" :rules="rules" label-width="120px">
      <el-form-item label="视频标题" prop="title">
        <el-input v-model="video.title"/>
      </el-form-item>
      <el-form-item label="视频描述" prop="describe">
        <el-input type="textarea" v-model="video.describe"/>
      </el-form-item>
      <el-form-item label="视频类别" prop="type">
        <el-select v-model="video.type" placeholder="请选择视频类别">
          <el-option v-for="(v,index) in videoTypes" :key="index" :label="v" :value="v"/>
        </el-select>
      </el-form-item>
      <el-form-item label="视频封面" prop="poster">
        <el-upload
          ref="uploadPoster"
          :action="uploadPicturePath"
          :headers="header"
          :on-success="handlePosterSuccess"
          :on-error="handlePosterFail"
          :on-remove="handlePosterRemove"
          :limit="1"
          list-type="picture">
          <el-button size="small" type="primary">上传封面</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="上传视频" prop="source">
        <el-upload
          ref="uploadVideo"
          :action="uploadVideoPath"
          :headers="header"
          :before-upload="beforeVideoUpload"
          :on-success="handleVideoSuccess"
          :on-error="handleVideoFail"
          :on-remove="handleVideoRemove"
          :limit="1"
          list-type="picture">
          <el-button size="small" type="primary">上传视频</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="publish('video-form')">提交</el-button>
      </el-form-item>
    </el-form>
  </b-container>
</template>

<script>
    import {isContainedSensitiveWord} from "../../../utils/func";
    import {addVideo} from "../../../api/api";
    import {mapState} from "vuex";
    import {CONSTANT_VIDEO} from "../../../utils/constant";

    export default {
        name: "PublishVideo",
      data() {
          return {
            video:{
              title:'',
              describe:'',
              poster:'',
              type:'',
              source:''
            },
            videoPoster:{},
            videoSource:{},
            videoTypes:['搞笑','游戏','生活','影视','科技','其他'],
            rules: {
              title: [{required: true, message: '请输入标题', trigger: 'blur'}],
              describe: [{required: true, message: '描述一下喔', trigger: 'blur'}],
              poster: [{required: true, message: '请上传封面', trigger: 'blur'}],
              type: [{required: true, message: '请选择一个类别', trigger: 'change'}],
              source: [{required: true, message: '请上传视频', trigger: 'blur'}]
            },
            uploadPicturePath:"http://127.0.0.1:8080/api/resource/upload/picture",
            uploadVideoPath:"http://127.0.0.1:8080/api/resource/upload/video"
          }
      },
      computed:{
        ...mapState('user', ['user']),
        header() {
          return {
            "X-token":this.user.token
          }
        }
      },
      methods: {
        handlePosterRemove(file, fileList) {
          this.video.poster = ''
          this.videoPoster= null
        },
        handlePosterSuccess(response, file, fileList) {
          this.videoPoster = fileList[0].response.data
          this.video.poster = this.videoPoster
        },
        handlePosterFail(err, file, fileList) {
          this.$message.error("上传失败,网络出错或登录身份已失效")
        },
        handleVideoRemove(file, fileList) {
          this.video.source = ''
          this.videoSource = ''
        },
        beforeVideoUpload(file) {
          const fileType = file.type
          const isLt100M = file.size / 1024 / 1024 < 100 // 算出文件大小
          if (!isLt100M) { // 这里我们限制文件大小为100M
            this.$message.error('最大只能上传100M!')
            this.$refs['uploadVideo'].abort()
            return isLt100M
          }
          if (fileType !== 'video/mp4') { // 限制文件类型
            this.$message.error('只能上传MP4格式视频!')
            this.$refs['uploadVideo'].abort()
            return false
          }
          return true
        },
        handleVideoSuccess(response, file, fileList) {
          this.videoSource = fileList[0].response.data
          this.video.source = this.videoSource
        },
        handleVideoFail(err, file, fileList) {
          this.$message.error("上传失败,网络出错或登录身份已失效")
        },
        publish(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              if (isContainedSensitiveWord(this.video.title)) {
                this.$message({type: 'warning', message: '标题含有敏感词'})
              } else if (isContainedSensitiveWord(this.video.describe)) {
                this.$message({type: 'warning', message: '描述内容含有敏感词'})
              } else {
                const params = {
                  video: {
                    title: this.video.title,
                    describe: this.video.describe,
                    typeName: this.video.type,
                    author: {
                      id: this.user.id
                    }
                  },
                  videoSource:{
                    id: this.videoSource.id,
                  },
                  videoPoster:{
                    id:this.videoPoster.id,
                    title:this.videoPoster.title,
                    date:this.videoPoster.date,
                    url:this.videoPoster.url,
                    topicType:CONSTANT_VIDEO,
                    content:this.videoPoster.content,
                    author: {
                      id:this.user.id
                    }
                  }
                }
                console.log(params)
                const vm = this
                addVideo(params, video => {
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
          this.$refs[formName].resetFields();
          this.$refs['uploadPoster'].clearFiles()
          this.$refs['uploadVideo'].clearFiles()
        }
      }
    }
</script>

<style scoped>

</style>

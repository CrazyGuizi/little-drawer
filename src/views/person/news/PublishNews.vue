<template>
  <b-container class="mt-md-4">
    <el-form ref="news-form" :model="news" :rules="rules" label-width="120px">
      <el-form-item label="新闻标题" prop="title">
        <el-input v-model="news.title"/>
      </el-form-item>
      <el-form-item label="新闻类别" prop="column">
        <el-select v-model="news.column" placeholder="请选择新闻类别">
          <el-option v-for="(c,index) in newsColumn" :key="index" :label="c" :value="c"/>
        </el-select>
      </el-form-item>
      <el-form-item label="新闻封面">
        <el-upload
          class="upload-demo"
          ref="upload"
          :action="uploadPicturePath"
          :headers="header"
          :multiple="isMultiple"
          :on-remove="handleRemove"
          :on-error="handleFail"
          :on-success="handleSuccess"
          :file-list="coverPictureList"
          :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取图片</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="图片地址">
        <el-card>
          <p v-for="(f,index) in fileListFilter" :key="index">图片：{{f.name}} 地址：{{f.response.data.url}}</p>
        </el-card>
      </el-form-item>
      <el-form-item label="新闻内容" prop="content">
        <quill-editor
          class="quill-editor"
          :content="news.content"
          @change="onEditorChange($event)">
        </quill-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="publish('news-form')">发表</el-button>
        <!--<el-button @click="resetForm('news-form')">重置</el-button>-->
      </el-form-item>
    </el-form>
  </b-container>
</template>

<script>
  import {isContainedSensitiveWord} from "../../../utils/func";
  import {mapState} from "vuex";
  import {addNews} from "../../../api/api";
  import {CONSTANT_NEWS} from "../../../utils/constant";

  export default {
    name: "PublishNews",
    data() {
      return {
        news: {
          title: '',
          content: '',
          column: '',
        },
        newsColumn: ['社会', '科技', '生活', '娱乐', '农业', '国际', '体育'],
        coverPictureList: [],
        rules: {
          title: [
            {required: true, message: '请输入标题', trigger: 'blur'}
          ],
          column: [{required: true, message: '请选择一个类别', trigger: 'change'}],
          content: [{required: true, message: '请输入内容', trigger: 'blur'}]
        },
        uploadPicturePath:'http://127.0.0.1:8080/api/resource/upload/picture',
        isMultiple:true
      }
    },
    computed: {
      ...mapState('user', ['user']),
      header() {
        return {
          "X-token":this.user.token
        }
      },
      fileListFilter() {
        return this.coverPictureList.filter(f => f.response != null && f.response != undefined)
      }
    },
    methods: {
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        this.coverPictureList = fileList
      },
      handleSuccess(response, file, fileList) {
        this.coverPictureList = fileList
      },
      handleFail(err, file, fileList) {
        this.$message.error("上传失败,网络出错或登录身份已失效")
      },
      onEditorChange({quill, html, text}) {
        this.news.content = html
      },
      publish(formName) {
        console.log(this.news)
        console.log(this.coverPictureList)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (isContainedSensitiveWord(this.news.title)) {
              this.$message({type: 'warning', message: '标题含有敏感词'})
            } else if (isContainedSensitiveWord(this.news.content)) {
              this.$message({type: 'warning', message: '新闻内容含有敏感词'})
            } else {

              const params = {
                title:this.news.title,
                column:this.news.column,
                content:this.news.content,
                author: {
                  id:this.user.id
                }
              }

              // 判断图片封面的数量判断新闻的style
              if (this.coverPictureList.length <= 0) {
                params.style = 2
              } else if (this.coverPictureList.length <= 2) {
                params.style = 1
              } else {
                params.style = 3
              }

              // 更新后台图片，确保该条新闻能够找到这些图片
              const newsCovers = []
              if (this.coverPictureList != null && this.coverPictureList.length > 0) {
                this.coverPictureList.forEach(p => {
                  newsCovers.push({
                    content: p.response.data.content,
                    date: p.response.data.date,
                    id: p.response.data.id,
                    title: p.response.data.title,
                    topicId: 0,
                    topicType: CONSTANT_NEWS,
                    url: p.response.data.url,
                    author: {
                      id:this.user.id
                    }
                  })
                })
              }
              params.coverPictures = newsCovers

              const vm = this
              addNews(params, news => {
                  vm.$message({type: 'success', message: '发表成功'})
                  vm.resetForm(formName)
                },
                e => {
                  vm.$message({type: 'error', message: '发表失败'})
                })
            }
          } else {
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.$refs['upload'].clearFiles()
        this.coverPictureList = []
      }
    },

  }
</script>

<style scoped>

</style>

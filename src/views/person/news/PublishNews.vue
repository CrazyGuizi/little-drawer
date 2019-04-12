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
      <el-form-item label="上传图片">
        <el-upload
          class="upload-demo"
          ref="upload"
          action="http://192.168.43.3:8080/upload/picture"
          :multiple="true"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :file-list="fileList"
          :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="图片地址">
        <el-card>
          <p v-for="(f,index) in fileListFilter" :key="index">图片：{{f.name}} 地址：{{f.response.data.picture.src}}</p>
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
        fileList: [],
        rules: {
          title: [
            {required: true, message: '请输入标题', trigger: 'blur'}
          ],
          column: [{required: true, message: '请选择一个类别', trigger: 'change'}],
          content: [{required: true, message: '请输入内容', trigger: 'blur'}]
        }
      }
    },
    computed: {
      ...mapState('user', ['user']),
      fileListFilter() {
        return this.fileList.filter(f => f.response != null && f.response != undefined)
      }
    },
    methods: {
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        this.fileList = fileList
      },
      handleSuccess(response, file, fileList) {
        this.fileList = fileList
      },
      onEditorChange({quill, html, text}) {
        this.news.content = html
      },
      publish(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (isContainedSensitiveWord(this.news.title)) {
              this.$message({type: 'warning', message: '标题含有敏感词'})
            } else if (isContainedSensitiveWord(this.news.content)) {
              this.$message({type: 'warning', message: '新闻内容含有敏感词'})
            } else {
              const params = {
                news: this.news,
                userId: this.user.id
              }
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
        this.fileList = []
      }
    },

  }
</script>

<style scoped>

</style>

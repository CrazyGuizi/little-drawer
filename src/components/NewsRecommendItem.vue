<template>
  <b-container class="mt-2">
    <b-card :img-src="picUrls[0]" img-alt="图片" img-top>
      <a class="link" href="#" @click.prevent="getNewsDetail(id)"><p>{{title}}</p></a>
    </b-card>
  </b-container>
</template>

<script>

  import {getNewsDetail} from "@/utils/func";

  export default {
    name: "NewsRecommendItem",
    props: {
      id: {
        type: Number,
        default: 1
      },
      picUrls: {
        type: Array,
        default() {
          return ['http://pic.52112.com/180205/18020526/a9yPQozt0g.jpg']
        }
      },
      title: {
        type: String,
        default: '假装这里存在ssssssssssssssssssssssssssssssssssssssssssssss着一个标题哈'
      }
    },
    methods: {
      getNewsDetail
    }
  }
</script>

<style scoped>
  .link {
    p {
      /*overflow: hidden;*/
      /*text-overflow: ellipsis;*/
      /*white-space: nowrap;*/
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
  }

</style>

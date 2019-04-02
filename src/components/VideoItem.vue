<template>
  <b-container class="video" @click="getVideoDetail(id)">
    <b-row class="align-items-center">
      <b-img-lazy :class="[isPosterSmall ? 'video-poster-small' : 'video-poster-normal','video-poster']" :src="posterUrl" rounded alt="视频封面"/>
    </b-row>
    <b-row class="text-md-center">
      <span class="title mt-3">{{title}}</span>
    </b-row>
    <slot name="video-type"></slot>
    <b-row class="mt-2 align-items-center">
      <img class="icon" src="@/assets/images/see.png" alt="观看">
      <span class="ml-2">{{click}}</span>
      <img class="icon ml-md-5" src="@/assets/images/like.png" alt="喜欢">
      <span class="ml-2">{{like}}</span>
    </b-row>
  </b-container>
</template>

<script>


  import {getVideoDetail} from "../utils/func";

  export default {
    name: "VideoItem",
    props: {
      isPosterSmall:{
        type:Boolean,
        default:false
      },
      id: {
        type: Number,
        default: 0
      },
      posterUrl: {
        type: String,
        default: 'http://pic.52112.com/180205/18020526/a9yPQozt0g.jpg'
      },
      title: {
        type: String,
        default: '哈哈哈哈哈'
      },
      typeId: {
        type: Number,
        default: 6
      },
      typeName: {
        type: String,
        default: '生活'
      },
      click: {
        type: Number,
        default: 156
      },
      like: {
        type: Number,
        default: 15
      }
    },
    methods: {
      getVideoDetail
    }
  }
</script>

<style scoped>

  .video {
    cursor: pointer;
  }

  .video-poster-normal {
    width: 350px;
    height: 260px
  }

  .video-poster-small {
    width: 250px;
    height: 150px
  }

  .video:hover .title {
    color: #007bff;
  }

  .video:hover .video-poster {
    -webkit-transform: scale(1.05);
    -moz-transform: scale(1.05);
    -o-transform: scale(1.05);
    transform: scale(1.05);
  }


  .title {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }

  .icon {
    width: 25px;
    height: 25px;
    object-fit: cover;
  }
</style>

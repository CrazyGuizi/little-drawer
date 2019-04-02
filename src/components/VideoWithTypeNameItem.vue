<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <VideoItem v-bind="video">
      <template v-slot:video-type>
        <b-row><span  class="type mt-2">类型：{{video.typeName}}</span></b-row>
      </template>
    </VideoItem>
</template>

<script>
    import VideoItem from "./VideoItem";
    export default {
      name: "VideoWithTypeNameItem",
      props:{
        video:{}
      },
      components: {VideoItem}
    }
</script>

<style scoped>
  .type {
    font-size: 14px;
    color: #999999;
  }
</style>

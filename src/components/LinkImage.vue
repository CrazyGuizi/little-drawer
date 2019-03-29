<template>
  <a v-bind:href="link"><img v-bind:src="imgSrc" :width="imgW" :height="imgH" :alt="imgAlt"></a>
</template>

<script>
  export default {
    name: "LinkImage",
    props: {
      link:String,
      imgSrc:String,
      imgW:Number,
      imgH:Number,
      imgAlt:String
    }
  }
</script>

<style scoped>

</style>

<template>
    <div>
      <span @click="$emit('loadMore')" >点击加载更多</span>
      <img src="@/assets/images/more.png">
    </div>
</template>

<script>
    export default {
        name: "LoadMore"
    }
</script>

<style scoped>

  div {
    margin-top: 10px;
    text-align: center;
  }

  div span {
    cursor: pointer;
  }

  div img {
    display: inline-block;
  }

</style>

<template>
    <div id="footer">
      <b-img v-bind="mainProps" blank-color="#777" alt="HEX shorthand color image (#777)" />
    </div>
</template>

<script>
    export default {
        name: "Footer",
      data() {
          return {
            mainProps: { blank: true, width: 1500, height: 100, class: 'm1' }
          }
      }
    }
</script>

<style scoped>

  #footer {
    margin-top: 64px;
    border-top: 1px solid #9F9F9F;
    text-align: center;

    b-img {
      text-align: center;
      object-fit: cover;
    }
  }

</style>

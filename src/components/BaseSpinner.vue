<template>
  <b-spinner v-show="config.isShow" :type="config.type" :label="config.label"
             :variant="config.variant" :small="config.isSmall"/>
</template>

<script>

  import {mapState} from 'vuex'

    export default {
        name: "BaseSpinner",
      computed:(mapState('common',{config:'spinnerConfig'}))
    }
</script>

<style scoped>

</style>

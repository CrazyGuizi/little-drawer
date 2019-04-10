<!--<template>-->

<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--name: "MenuItem"-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->

<script>
  export default {
    name: 'MenuItem',
    functional: true,
    props: {
      meta: {
        type: Object,
        default: () => {
          return {
            title: '',
            icon: ''
          }
        }
      }
    },
    render(h, context) {
      const {title, icon} = context.props.meta
      const vnodes = []
      if (icon) {
        vnodes.push(<svg-icon icon-class={icon}/>)
      }

      if (title) {
        vnodes.push(<span slot='title'>{(title)}</span>)
      }
      return vnodes
    }
  }
</script>

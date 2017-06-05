<template lang="pug">
  .d-flex.align-items-center
    img.icon(src='//static.coloso.net/images/icons/minion.png')
    span.text-secondary {{ amount }}
</template>

<script>
  export default {
    name: 'Minions',

    props: {
      amount: {
        type: Number,
        default: 0,
      },
    },
  };
</script>

<style lang="stylus" scoped>
  .icon
    width: 1em
    margin-right: 0.25em
</style>

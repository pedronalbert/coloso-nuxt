<template lang="pug">
  .d-flex.align-items-center
    img.icon(src='//static.coloso.net/images/icons/ward.png')
    span.text-secondary {{ amount }}
</template>

<script>
  export default {
    name: 'Wards',

    props: {
      amount: {
        type: Number,
        default: 0,
      },
    },
  };
</script>

<style lang="scss" scoped>
  .icon {
    width: 18px;
    margin-right: 0.25em;
  }
</style>

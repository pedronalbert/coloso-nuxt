<template lang="pug">
  button.load-more-button.text-uppercase
    | {{ $t('loadMore') }}
</template>

<script>
  export default {
    name: 'LoadMoreButton',
  };
</script>

<style lang="stylus" scoped>
  @require '../assets/stylus/colors';

  .load-more-button
    height: 36px
    width: 100%
    background-color: white
    border-radius: 3px
    border: 1.5px solid colors.accent
    color: colors.accent
    font-weight: bold
    cursor: pointer
    font-size: 1rem
</style>

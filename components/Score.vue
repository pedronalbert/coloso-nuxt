<template lang="pug">
  .Score
    img.icon(src='//static.coloso.net/images/icons/score.png')
    .statsText
      span.text-victory.text-nowrap {{ kills || 0 }}
      |  /&nbsp
      span.text-defeat {{ deaths || 0 }}
      |  /&nbsp
      span.text-secondary {{ assists || 0 }}
</template>

<script>
  export default {
    name: 'Score',

    props: {
      kills: {
        type: Number,
        defaults: 0,
      },

      deaths: {
        type: Number,
        defaults: 0,
      },

      assists: {
        type: Number,
        defaults: 0,
      },
    },
  };
</script>

<style lang="stylus" scoped>
  @require '../assets/stylus/colors'

  .Score
    display: flex
    align-items: center
    color: colors.text.primary

    .icon
      width: 1em
      margin-right: 0.25em

    .statsText
      white-space: nowrap
</style>

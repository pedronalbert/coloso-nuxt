<template lang="pug">
  .WinRate
    .wins(:title="$t('victories')")
      | {{ wins }}
    .rate(:class='rateClass')
      | {{ rate }}%
    .losses(:title="$t('defeats')")
      | {{ losses }}
</template>

<script>
  export default {
    name: 'WinRate',

    props: ['wins', 'losses'],

    computed: {
      rate() {
        return ((this.wins * 100) / (this.wins + this.losses)).toFixed(0);
      },

      rateClass() {
        if (this.rate > 50) {
          return 'good';
        } else if (this.rate < 50) {
          return 'bad';
        }

        return null;
      },
    },
  };
</script>

<style lang="stylus">
  @require '../assets/stylus/colors'

  .WinRate
    color: white
    display: flex
    align-items: center
    justify-content: center

    .wins
      background-color: colors.victory
      width: 3.4em
      height: 1.5em
      line-height: 1.5em
      text-align: center
      border-radius: 0.25em
      position: relative
      font-weight: bold

    .rate
      size = 2.5em

      color: rgba(0,0,0,0.5)
      width: size
      height: size
      line-height: size
      background-color: #EFEFEF
      border-radius: 50%
      text-align: center
      position: relative
      margin: 0 -0.25em
      z-index: 3

      &.good
        color: colors.victory
      &.bad
        color: colors.defeat

    .losses
      width: 3.4em
      height: 1.5em
      line-height: 1.5em
      text-align: center
      border-radius: 0.25em
      position: relative
      font-weight: bold
      background-color: colors.defeat
</style>

<template lang="pug">
  .ChampionMastery.elevation-3
    .avatarContainer(:class="'level-' + mastery.championLevel")
      champion-image(:champion-id='mastery.championId')
      mastery-tier-image(:level='mastery.championLevel')
      .flag
    .dataContainer
      div
        b.text-primary {{ mastery.championData.name }}
      .championTitle.text-secondary {{ mastery.championData.title | sentenceCase }}
      .text-primary.mt-1 {{ $t('level') }} {{ mastery.championLevel }}
        v-progress-linear.progress-gold(:value="progress")
      .d-flex.text-primary
        span {{ mastery.championPoints | numeral('0,0') }}
        span.u-flexer
        span {{ nextLevelPoints | numeral('0,0')}}
    .masteryPieces.text-secondary
      span.u-flexer
      span.d-flex.align-items-center(:title="$t('masteryPieces')")
        span.mr-1 {{ mastery.tokensEarned }}
        v-icon extension
</template>

<script>
  import { ChampionImage, MasteryTierImage } from '../../components';

  export default {
    name: 'ChampionMastery',

    props: ['mastery'],

    computed: {
      progress() {
        let progressNumber;

        if (this.mastery.championLevel === 7) {
          progressNumber = 100;
        } else {
          progressNumber = (this.mastery.championPoints / this.nextLevelPoints) * 100;
        }

        return progressNumber;
      },

      nextLevelPoints() {
        return this.mastery.championPoints + this.mastery.championPointsUntilNextLevel;
      },
    },

    components: {
      ChampionImage,
      MasteryTierImage,
    },
  };
</script>

<style lang="stylus" scoped>
  @require '../../assets/stylus/colors'
  @require '../../assets/stylus/mixins'

  .ChampionMastery
    display: flex
    width: calc(50% - 1em)
    margin-bottom: 1em
    padding: 0.5em
    position: relative

    +media-breakpoint-down(md)
      width: 100%

    .avatarContainer
      position: relative
      championImageSize = 4.2em

      .ChampionImage
        border-radius: 50%
        min-width: championImageSize
        min-height: championImageSize
        height: championImageSize
        width: championImageSize
        border: 3px solid #8e6e1a
        display: block

      .MasteryTierImage
        width: 2.5em
        height: 2.5em
        margin: -0.30em auto 0.4em auto
        display: block

      .flag
        flagSize = 3em
        background: red
        position: relative
        background-color: #8e6e1a
        width: flagSize
        height: 3.5em
        position: absolute
        top: championImageSize * 0.75
        left: ((championImageSize - flagSize) / 2)
        z-index: -1

        &:after
          content: ""
          position: absolute
          left: 0
          bottom: 0
          width: 0
          height: 0
          border-bottom: 0.3em solid white
          border-left: (flagSize / 2) solid transparent
          border-right: (flagSize / 2) solid transparent

      &.level-6
        flagColor = #791670

        .flag
          background-color: flagColor
        .ChampionImage
          border-color: flagColor


      &.level-7
        flagColor = #129b92

        .flag
          background-color: flagColor
        .ChampionImage
          border-color: flagColor

    .dataContainer
      margin-left: 1em
      font-size: 0.9em
      overflow: hidden
      flex: 1

      .championTitle
        text-overflow: ellipsis
        overflow: hidden
        white-space: nowrap

    .masteryPieces
      position: absolute
      top: .3em
      right: .3em
</style>

<style lang="stylus">
  .progress-gold
    margin: .25em 0
    height: .4em !important

    .progress-linear__bar__determinate
      background-color: #8e6e1a !important

  .masteryPieces
    font-size: 0.6em

    i
      font-size: 1.7em !important
</style>

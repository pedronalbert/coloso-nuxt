<template lang="pug">
  .ChampionMastery.elevation-2
    .avatarContainer(:class="'level-' + mastery.championLevel")
      champion-image(:champion-id='mastery.championId')
      mastery-tier-image(:level='mastery.championLevel')
      .flag
    .dataContainer
      div
        b.text-primary {{ mastery.championData.name }}
      .championTitle.text-secondary {{ mastery.championData.title | sentenceCase }}
      .text-primary.mt-1 {{ $t('level') }} {{ mastery.championLevel }}
      //- TODO: md-progress(:md-progress='progress', md-theme='gold')
      .d-flex.text-primary
        span {{ mastery.championPoints | numeral('0,0') }}
        span.u-flexer
        span {{ nextLevelPoints | numeral('0,0')}}
      .iconStatsRow.mt-1
        span.u-flexer
        span.d-flex.align-items-center(title='Piezas de Maestria')
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

<style lang="scss" scoped>
  @import '../../assets/scss/colors';
  @import '../../assets/scss/mixins';

  .ChampionMastery {
    display: flex;
    width: calc(50% - 1em);
    margin-bottom: 1em;
    padding: 0.5em;

    @include media-breakpoint-down(md) {
      width: 100%;
    }

    .avatarContainer {
      position: relative;
      $champion-image-size: 4.2em;

      .ChampionImage {
        border-radius: 50%;
        min-width: $champion-image-size;
        min-height: $champion-image-size;
        height: $champion-image-size;
        width: $champion-image-size;
        border: 3px solid #8e6e1a;
        display: block;
      }

      .MasteryTierImage {
        width: 2.5em;
        height: 2.5em;
        margin: -0.30em auto 0.4em auto;
        display: block;
      }

      .flag {
        $flag-size: 3em;
        background: red;
        position: relative;
        background-color: #8e6e1a;
        width: $flag-size;
        height: 3.5em;
        position: absolute;
        top: $champion-image-size * 0.75;
        left: ($champion-image-size - $flag-size) / 2;
        z-index: -1;

        &:after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 0;
          height: 0;
          border-bottom: 0.3em solid white;
          border-left: $flag-size / 2 solid transparent;
          border-right: $flag-size / 2 solid transparent;
        }

      }

      &.level-6 {
        $flag-color: #791670;

        .flag { background-color: $flag-color }
        .ChampionImage { border-color: $flag-color }
      }

      &.level-7 {
        $flag-color: #129b92;

        .flag { background-color: $flag-color }
        .ChampionImage { border-color: $flag-color }
      }
    }


    .dataContainer {
      margin-left: 1em;
      font-size: 0.9em;
      overflow: hidden;
      flex: 1;

      .championTitle {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      .md-progress-track { background-color: #8e6e1a !important }

      .iconStatsRow {
        display: flex;
        align-items: center;

        i {
          font-size: 1.2em !important;
          height: 1.1em !important;
          min-height: 1.1em !important;
        }
      }
    }
  }
</style>

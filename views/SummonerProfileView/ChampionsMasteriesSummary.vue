<template lang="pug">
  .d-flex.justify-content-around.flex-wrap.mb-2
    .masteryContainer(v-for='summaryEntry in masteriesSummary')
      mastery-tier-image(:level='summaryEntry.level')
      .countContainer
        b {{ summaryEntry.count }}
</template>

<script>
  import { MasteryTierImage } from '../../components';

  export default {
    name: 'ChampionsMasteriesSummary',

    props: ['masteries'],

    computed: {
      masteriesSummary() {
        const summary = [
          { level: 1, count: 0 },
          { level: 2, count: 0 },
          { level: 3, count: 0 },
          { level: 4, count: 0 },
          { level: 5, count: 0 },
          { level: 6, count: 0 },
          { level: 7, count: 0 },
        ];

        this.masteries.forEach((mastery) => {
          summary[mastery.championLevel - 1].count += 1;
        });

        return summary.reverse();
      },
    },

    components: {
      MasteryTierImage,
    },
  };
</script>

<style lang="stylus" scoped>
  @require '../../assets/stylus/mixins'

  .masteryContainer
    display: flex
    align-items: center

    .MasteryTierImage
      width: 2.5em
      height: 2.5em
      z-index: 5
      position: relative

    .countContainer
      background-color: rgba(0,0,0,0.7)
      display: inline-block
      width: 3em
      margin-left: -1em
      z-index: 0
      position: relative
      border-radius: 0.25em
      color: white
      padding-left: 0.75em
      text-align: center
      line-height: 1.4em
      font-size: 0.9em

    +media-breakpoint-down(md)
      &:last-child
        display: none
      &:nth-last-child(2)
        display: none
      &:nth-last-child(3)
        display: none

    +media-breakpoint-down(sm)
      &:nth-last-child(4)
        display: none
</style>

<template lang="pug">
  div
    champions-masteries-summary(:masteries='masteries')
    .masteriesContainer
      champion-mastery(v-for='mastery in masteries', :mastery='mastery', :key='mastery.championId')
</template>

<script>
  import ChampionMastery from './ChampionMastery.vue';
  import ChampionsMasteriesSummary from './ChampionsMasteriesSummary.vue';

  export default {
    name: 'ChampionsMasteries',

    props: ['masteries'],

    components: {
      ChampionMastery,
      ChampionsMasteriesSummary,
    },
  };
</script>

<style lang="scss" scoped>
  .masteriesContainer {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    max-height: 80vh;
    overflow-y: auto;
  }
</style>

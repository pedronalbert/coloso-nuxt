<template lang="pug">
  .Participant
    champion-and-spells(:champion-id='participant.championId', :spell1-id='participant.spell1Id', :spell2-id='participant.spell2Id')
    .championNameCol
      div
        router-link(:to="`/summoners/${participant.summoner.summonerId}`")
          | {{ participant.summoner.summonerName }}
      .text-secondary
        small {{ participant.champion.name }}
    .statsCol
      score(:kills='participant.stats.kills', :deaths='participant.stats.deaths', :assists='participant.stats.assists')
      minions(:amount='participant.stats.totalMinionsKilled')
      gold(:amount='participant.stats.goldEarned')
    final-items(:items-ids='finalItemsIds')
</template>

<script>
  import { FinalItems, ChampionAndSpells, Score, Gold, Minions } from '../../../components';

  export default {
    name: 'Pariticpant',

    props: ['participant'],

    computed: {
      finalItemsIds() {
        const itemsIds = [];

        for (let i = 0; i <= 6; i += 1) {
          itemsIds.push(this.participant.stats[`item${i}`]);
        }

        return itemsIds;
      },
    },

    components: {
      FinalItems,
      ChampionAndSpells,
      Score,
      Gold,
      Minions,
    },
  };
</script>

<style lang="stylus" scoped>
  @require '../../../assets/stylus/mixins'

  .Participant
    padding: 0.5em 0
    border-bottom: 1px solid rgba(0,0,0,0.2)
    display: flex
    align-items: center
    flex-wrap: wrap

    .championNameCol
      width: 11em
      display: flex
      flex-direction: column
      justify-content: center
      margin-left: .75em

      +media-breakpoint-down(lg)
        width: 7em

      +media-breakpoint-down(md)
        width: 5em

    .FinalItems
      font-size: 1.2em

      +media-breakpoint-down(lg)
        font-size: 0.9em

      +media-breakpoint-down(md)
        width: 100%
        margin-top: 0.5em
        font-size: 1em
        justify-content: center

      +media-breakpoint-down(xs)
        font-size: 0.8em

    .statsCol
      width: 10em
      font-size: 0.9em

      +media-breakpoint-down(lg)
        width: 7em

      +media-breakpoint-down(md)
        display: flex
        justify-content: space-around
        width: 50%
        margin-top: 0.5em

      +media-breakpoint-down(xs)
        width: 100%
</style>

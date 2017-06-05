<template lang="pug">
  router-link.Participant.styless(:to="`/summoners/${participant.summoner.summonerId}`")
    champion-avatar(:champion-id='participant.championId', :spell1-id='participant.spell1Id', :spell2-id='participant.spell2Id', :name='participant.summoner.summonerName', :title='participant.champion.name')
    .statsCol
      score(:kills='participant.stats.kills', :deaths='participant.stats.deaths', :assists='participant.stats.assists')
      minions(:amount='participant.stats.totalMinionsKilled')
      gold(:amount='participant.stats.goldEarned')
    final-items(:items-ids='finalItemsIds')
</template>

<script>
  import { FinalItems, ChampionAvatar, Score, Gold, Minions } from '../../../components';

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
      ChampionAvatar,
      Score,
      Gold,
      Minions,
    },
  };
</script>

<style lang="stylus" scoped>
  @require '../../../assets/stylus/mixins'

  .Participant
    display: flex
    align-items: center
    padding: 0.5em 0
    border-bottom: 1px solid rgba(0,0,0,0.2)
    cursor: pointer

    &:hover
      background-color: #EEEEEE

      +media-breakpoint-down(md)
        flex-wrap: wrap

    .ChampionAvatar
      width: 17em

      +media-breakpoint-down(lg)
        width: 14em
        font-size: 0.9em

      +media-breakpoint-down(md)
        width: 50%

      +media-breakpoint-down(xs)
        width: 100%

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

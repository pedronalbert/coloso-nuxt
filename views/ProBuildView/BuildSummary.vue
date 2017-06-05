<template lang="pug">
  .BuildSummary
    .d-flex.align-items-center.justify-content-between
      champion-avatar(:champion-id='build.champion.id', :name='build.champion.name', :title='build.champion.title', :spell1-id='build.spell1Id', :spell2-id='build.spell2Id')
      final-items.hidden-md-down(:items-ids='finalItemsIds')
      .timeAgoContainer.d-flex.align-items-center.hidden-lg-down
        v-icon.text-secondary.mr-2 access_time
        span.text-secondary {{ timeAgo }}
    .statsRow
      b.text-victory(v-if='build.stats.win') {{ $t('victory') }}
      b.text-defeat(v-else='') {{ $t('defeat') }}
      score(:kills='build.stats.kills', :deaths='build.stats.deaths', :assists='build.stats.assists')
      gold(:amount='build.stats.goldEarned')
      minions(:amount='build.stats.totalMinionsKilled')
      wards(:amount='build.stats.totalMinionsKilled')
      .d-flex.align-items-center
        v-icon.text-secondary.mr-2 timer
        span.text-secondary {{ durationTime }}
</template>

<script>
  import moment from 'moment';
  import numeral from '../../filters/numeral';
  import {
    ChampionAvatar,
    FinalItems,
    Score,
    Minions,
    Gold,
    Wards,
  } from '../../components';

  export default {
    name: 'BuildSummary',

    props: ['build'],

    computed: {
      finalItemsIds() {
        const itemIds = [];

        for (let i = 0; i <= 6; i += 1) {
          itemIds.push(this.build.stats[`item${i}`]);
        }

        return itemIds;
      },

      timeAgo() {
        return moment(this.build.gameCreation).add(this.build.gameDuration, 'seconds').fromNow();
      },

      durationTime() {
        const seconds = this.build.gameDuration;
        const duration = moment.duration({ seconds });
        const minutes = (duration.hours() * 60) + duration.minutes();

        return `${numeral(minutes, '00')}:${numeral(duration.seconds(), '00')}`;
      },
    },

    components: {
      ChampionAvatar,
      FinalItems,
      Score,
      Minions,
      Gold,
      Wards,
    },
  };
</script>

<style lang="stylus" scoped>
  .BuildSummary
    .FinalItems
      font-size: 1.25em

    .timeAgoContainer
      font-size: 0.9em

    .statsRow
      display: flex
      justify-content: space-around
      flex-wrap: wrap
      align-items: center
      margin-top: 0.30em
      margin-left: 0.50em
      margin-right: 0.50em
      margin-bottom: -0.50em
      font-size: 0.9em

      &>*
        padding: 4px 14px
</style>

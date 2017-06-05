<template lang="pug">
  .ProBuildsListRow(:class="build.stats.win ? 'victory' : 'defeat'")
    router-link.styless(:to="`/pro-builds/${build.id}`")
      .chipsContainer
        pro-player-chip(:image-url='build.proSummoner.proPlayer.imageUrl', :name='build.proSummoner.proPlayer.name', :real-name='build.proSummoner.proPlayer.realName', :role='build.proSummoner.proPlayer.role')
        span.arrow-icon-container.hidden-sm-down
          v-icon keyboard_arrow_right
        champion-avatar(:champion-id='build.champion.id', :spell1-id='build.spell1Id', :spell2-id='build.spell2Id', :name='build.champion.name', :title='build.champion.title')
      .statsRow
        span.win-status.text-victory.hidden-md-down(v-if='build.stats.win') {{ $t('victory') }}
        span.win-status.text-defeat.hidden-md-down(v-else='') {{ $t('defeat') }}
        score(:kills='build.stats.kills', :deaths='build.stats.deaths', :assists='build.stats.assists')
        gold.hidden-md-down(:amount='build.stats.goldEarned')
        minions.hidden-sm-down(:amount='build.stats.totalMinionsKilled')
        final-items.hidden-sm-down(:items-ids='finalItemsIds')
        .time-ago
          v-icon.time-icon.text-secondary access_time
          span.text-time-ago.text-secondary {{ timeAgo }}
</template>

<script>
  import { has } from 'lodash';
  import moment from 'moment';

  import ProPlayerChip from '../ProPlayerChip.vue';
  import ChampionAvatar from '../ChampionAvatar.vue';
  import Score from '../Score.vue';
  import Gold from '../Gold.vue';
  import Minions from '../Minions.vue';
  import FinalItems from '../FinalItems.vue';

  export default {
    name: 'ProBuildsListRow',

    props: {
      build: {
        type: Object,
        required: true,
      },
    },

    computed: {
      finalItemsIds() {
        const itemsIds = [];

        for (let i = 0; i <= 6; i += 1) {
          if (has(this.build.stats, `item${i}`)) {
            itemsIds.push(this.build.stats[`item${i}`]);
          } else {
            itemsIds.push(0);
          }
        }

        return itemsIds;
      },

      timeAgo() {
        return moment(this.build.gameCreation + (this.build.gameDuration * 1000)).fromNow();
      },
    },

    components: {
      ProPlayerChip,
      ChampionAvatar,
      Score,
      Gold,
      Minions,
      FinalItems,
    },
  };
</script>

<style lang="stylus">
  @require '../../assets/stylus/mixins'
  @require '../../assets/stylus/colors'

  .ProBuildsListRow
    cursor: pointer
    padding: 10px 16px
    border-bottom: 1px solid rgba(0,0,0,0.2)

    active-shadow()

    &:hover
      background-color: #EEEEEE

    +media-breakpoint-down(md)
      &.victory
        border-left: 6px solid colors.victory

      &.defeat
        border-left: 6px solid colors.defeat

    &:last-child
      border-bottom: none

    .chipsContainer
      display: flex

      .ProPlayerChip
        width: 200px

      +media-breakpoint-down(sm)
        display: block

    .statsRow
      display: flex
      align-items: center
      justify-content: space-around
      font-size: 14px
      margin-top: 8px

      .win-status
        width: 110px
        font-weight: bold

      .Score
        width: 120px
      .Gold
        width: 120px
      .Minions
        width: 110px
      .time-ago
        width: 140px
      .FinalItems
        width: 16em

      +media-breakpoint-down(lg)
        .win-status
          width: 100px
        .Score
          width: 120px
        .Gold
          width: 110px
        .Minions
          width: 110px
        .time-ago
          width: 140px

      +media-breakpoint-down(sm)
        .time-ago
          width: auto

    .time-icon
      margin-right: 3px
      width: 18px
      height: 18px
      min-height: 18px
      min-width: 18px
      font-size: 18px

    .arrow-icon-container
      margin: auto 8px auto 8px

    .ChampionAvatar
      margin: 8px 0 0 12px
</style>

<template lang="pug">
  .GamesRecentRow
    .row.justify-content-around
      .col-auto.mr-2
        champion-avatar(:champion-id='game.championId', :spell1-id='game.spell1', :spell2-id='game.spell2')
      .gameInfoContainer.col-auto.d-flex.flex-column.align-items-center.text-nowrap.flexer
        div {{ gameType }}
        .text-victory(v-if='game.stats.win')
          b {{ $t('victory') }}
        .text-defeat(v-else='')
          b {{ $t('defeat') }}
        .d-flex.align-items-center
          v-icon.uiIcon timer
          span.text-secondary {{ gameDuration }}
      .scoreInfoContainer.col-auto
        score(:kills='game.stats.championsKilled', :deaths='game.stats.numDeaths', :assists='game.stats.assists')
        .text-secondary.text-nowrap
          | KDA:
          kda(:kills='game.stats.championsKilled', :deaths='game.stats.numDeaths', :assists='game.stats.assists')
        .multiKillBadge(v-if='game.stats.largestMultiKill > 1', :class='multiKillType')
          | {{ multiKillType }} Kill
      .statsContainer.col-12.mt-1.col-lg-auto.mt-lg-0
        .row.no-gutters.h-100
          .col.d-flex.justify-content-around.col-lg-auto.mr-lg-2.flex-lg-column.justify-content-lg-center
            minions(:amount='game.stats.minionsKilled')
            gold(:amount='game.stats.goldEarned', :abbr="true")
          .col.d-flex.justify-content-around.col-lg-auto.flex-lg-column.justify-content-lg-center
            wards(:amount='game.stats.wardPlaced')
            span.text-secondary.text-nowrap IP: +{{game.ipEarned}}
      .col-auto
        compact-final-items.hidden-md-down(:items-ids='finalItems')
        final-items.mt-1.hidden-lg-up(:items-ids='finalItems')
</template>

<script>
  import moment from 'moment';

  import { ChampionAvatar, Score, Minions, Gold, Wards, CompactFinalItems, FinalItems, Kda } from '../../components';
  import numeral from '../../filters/numeral';
  import { subTypeToQueueId } from '../../utils';

  export default {
    name: 'GamesRecentRow',

    props: ['game'],

    computed: {
      gameDuration() {
        const durationMoment = moment.duration({ seconds: this.game.stats.timePlayed });
        const minutesString = numeral(durationMoment.minutes(), '00');
        const secondsString = numeral(durationMoment.seconds(), '00');

        return `${minutesString}:${secondsString}`;
      },

      finalItems() {
        const items = [];

        for (let i = 0; i <= 6; i += 1) {
          items.push(this.game.stats[`item${i}`] || 0);
        }

        return items;
      },

      multiKillType() {
        const multikill = this.game.stats.largestMultiKill;

        if (multikill === 2) {
          return 'double';
        } else if (multikill === 3) {
          return 'triple';
        } else if (multikill === 4) {
          return 'quadra';
        } else if (multikill === 5) {
          return 'penta';
        }

        return null;
      },

      gameType() {
        const queueId = subTypeToQueueId(this.game.subType);

        return this.$t(`queuesIds.${queueId}`);
      },
    },

    components: {
      ChampionAvatar,
      Score,
      Minions,
      Gold,
      Wards,
      CompactFinalItems,
      Kda,
      FinalItems,
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/colors';
  @import '../../assets/scss/mixins';

  .GamesRecentRow {
    padding: 0.5em;
    border-bottom: 1px solid rgba(0,0,0,0.2);

    &:last-child { border-bottom: none }

    .gameInfoContainer,
    .statsContainer,
    .scoreInfoContainer {
      font-size: 0.8em;
      line-height: 1.7em;
    }

    .gameInfoContainer {
      width: 10em;

      @include media-breakpoint-only(lg) {
        width: 8.5em;
      }
    }

    .scoreInfoContainer {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

        .multiKillBadge {
          background-color: $color-accent;
          line-height: 1.5em;
          width: 6em;
          border-radius: 0.5em;
          text-transform: capitalize;
          color: white;
          text-align: center;
        }
    }

    .statsContainer {
      position: relative;
      width: 12em;

      @include media-breakpoint-down(md) {
        width: 6em;
      }
    }

    .uiIcon {
      font-size: 1.2em;
      width: 1em !important;
      height: 1em !important;
      min-width: 1em !important;
      min-height: 1em !important;
      margin: 0;
      margin-right: 0.25em;
    }
  }
</style>

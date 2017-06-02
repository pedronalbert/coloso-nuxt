<template lang="pug">
  .GamesRecentRow
    .row.no-gutters
      .col-12.finalInfo.mb-2.ml-2
        span.text-secondary
          b {{ gameType }}
          span.mx-2.hidden-md-down ♦
          span.text-secondary.hidden-md-down {{ $t(`mapsIds[${this.game.mapId}]`) }}
          span.mx-2 ♦
          span.text-secondary {{ timeAgo | sentenceCase }}
      .col-4.col-lg-2
        champion-avatar(:champion-id='game.championId', :spell1-id='game.spell1', :spell2-id='game.spell2')
      .gameInfoContainer.col.col-lg-2.d-flex.flex-column.justify-content-center.align-items-center
        .victoryText.text-victory(v-if='game.stats.win')
          b {{ $t('victory') }}
        .victoryText.text-defeat(v-else='')
          b {{ $t('defeat') }}
        .multiKillBadge.mx-auto.mt-1(v-if='game.stats.largestMultiKill > 1', :class='multiKillType')
          v-icon.mr-1 whatshot
          | {{ multiKillType }}
        .d-flex.justify-content-center.align-items-center.mt-1
          v-icon.uiIcon timer
          span.text-secondary {{ gameDuration }}
      .scoreInfoContainer.col.col-lg-2
        score(:kills='game.stats.championsKilled', :deaths='game.stats.numDeaths', :assists='game.stats.assists')
        .text-secondary.text-nowrap
          span.mr-1 KDA:
          kda(:kills='game.stats.championsKilled', :deaths='game.stats.numDeaths', :assists='game.stats.assists')
      .statsContainer.col-12.col-lg.ml-2.d-flex.flex-column.justify-content-center
        .row.no-gutters
          .col.d-flex.flex-lg-column.justify-content-around
            minions(:amount='game.stats.minionsKilled')
            gold(:amount='game.stats.goldEarned', :abbr="true")
          .col.d-flex.flex-lg-column.justify-content-around
            wards(:amount='game.stats.wardPlaced')
            span.text-secondary.text-nowrap IP: +{{game.ipEarned}}
      .col-12.col-lg-auto
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

      timeAgo() {
        return moment(this.game.createDate).add(this.game.stats.timePlayed, 'seconds').fromNow();
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

    .victoryText {
      font-size: 1.2em;
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

    }

    .multiKillBadge {
      display: flex;
      background-color: $color-accent;
      line-height: 1.5em;
      width: 6em;
      border-radius: 0.5em;
      text-transform: capitalize;
      color: white;
      text-align: center;
      justify-content: center;

      i {
        color: white;
        font-size: 1.4em;
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

    .finalInfo {
      font-size: 0.8em;
    }
  }
</style>

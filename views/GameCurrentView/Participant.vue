<template lang="pug">
  .Participant.row
    .championInfoCol
      champion-and-spells(:champion-id='participant.championId', :spell1-id='participant.spell1Id', :spell2-id='participant.spell2Id')
      .dataCol
        div
          router-link(:to="`/summoners/${participant.summonerId}`")
            small.summonerName {{ participant.summonerName}}
        .text-secondary
          small {{ participant.champion.name }}
    .col-auto.rankedTierCol
      .rankedTierContainer
        ranked-tier-image(:tier='rankedTier')
        .division(v-if='rankedSoloEntry') {{ rankedSoloEntry.entries[0].division }}
    .col.rankedStatsCol
      .rankedStats
        .text-center.text-secondary
          small {{ $t('rankedStats') }}
        template(v-if='rankedSoloEntry')
          win-rate(:wins='rankedSoloEntry.entries[0].wins', :losses='rankedSoloEntry.entries[0].losses')
          ranked-miniseries(v-if='rankedSoloEntry.entries[0].miniSeries', :progress='rankedSoloEntry.entries[0].miniSeries.progress')
          .leaguePoints(v-else='')
            | {{ $t('leaguePoints') }}:
            b {{ rankedSoloEntry.entries[0].leaguePoints}}
        template(v-else='')
          .na N/A
    .col.championStatsCol
      .championStats
        .text-center.text-secondary
          small {{ $t('championStats') }}
        template(v-if='participant.championRankedStats')
          win-rate(:wins='participant.championRankedStats.totalSessionsWon', :losses='participant.championRankedStats.totalSessionsLost')
          .kda
            | KDA:
            kda(:kills='participant.championRankedStats.totalChampionKills', :deaths='participant.championRankedStats.totalDeathsPerSession', :assists='participant.championRankedStats.totalAssists')
        template(v-else='')
          .na N/A
    .buttonsCol
      v-btn(@click.native='handleOnClickRunesButton') {{ $t('runes') }}
      v-btn(@click.native='handleOnClickMasteriesButton') {{ $t('masteries') }}
</template>

<script>
  import { find } from 'lodash';

  import { ChampionAndSpells, RankedTierImage, WinRate, RankedMiniseries, Kda } from '../../components';

  export default {
    name: 'Participant',

    props: ['participant'],

    computed: {
      rankedSoloEntry() {
        return find(this.participant.leagueEntry.entries, { queue: 'RANKED_SOLO_5x5' });
      },

      rankedTier() {
        if (this.rankedSoloEntry !== undefined) {
          return this.rankedSoloEntry.tier;
        }

        return 'UNRANKED';
      },
    },

    methods: {
      handleOnClickRunesButton() {
        this.$emit('click-runes', { runes: this.participant.runes });
      },

      handleOnClickMasteriesButton() {
        this.$emit('click-masteries', { masteries: this.participant.masteries });
      },
    },

    components: {
      ChampionAndSpells,
      RankedTierImage,
      WinRate,
      RankedMiniseries,
      Kda,
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/mixins';

  .Participant {
    margin: 0 0.5em;
    padding: 0.5em 0em;
    border-bottom: 1px solid #BDBDBD;

    .championInfoCol {
      width: 15em;
      display: flex;
      align-items: center;

      .dataCol {
        margin-left: 0.5em;
        overflow: hidden;
        flex: 1;

        .summonerName {
          font-size: 0.9em;
          font-weight: bold;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }

      @include media-breakpoint-down(lg) {
        width: 14em;
      }
    }

    .rankedTierCol {
      width: 4em;
      margin-left: 1em;
      display: flex;
      justify-content: center;
      align-items: center;

      @include media-breakpoint-down(lg) {
        width: 4em;
      }

      .rankedTierContainer {
        position: relative;
        display: inline-block;
        height: 3.5em;

        .RankedTierImage {
          width: 3.5em;
          height: 3.5em;
        }

        .division {
          color: white;
          position: absolute;
          bottom: 0;
          right: 0;
          background-color: rgba(0,0,0,0.8);
          font-size: 0.7em;
          width: 1.5em;
          height: 1.5em;
          line-height: 1.5em;
          text-align: center;
          border-radius: 50%;
        }
      }
    }

    .rankedStatsCol {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      .rankedStats {
        display: inline-block;
        .leaguePoints {
          font-size: 0.9em;
          text-align: center;
        }

        .RankedMiniseries {
          font-size: 0.8em;
        }
      }
    }

    .championStatsCol {
      @extend .rankedStatsCol;

      .championStats {
        display: inline-block;
        .kda {
          font-size: 0.9em;
          text-align: center;
        }
      }
    }

    .buttonsCol {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .na {
      width: 9.5em;
      text-align: center;
    }
  }
</style>

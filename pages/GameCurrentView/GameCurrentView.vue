<template lang="pug">
  .GameCurrentView.container
    loading-view(v-if='gameCurrentState.fetching')
    error-view(v-else-if='gameCurrentState.fetchError', :message='gameCurrentState.errorMessage', :retry-button='false')
    v-card.animated.fadeIn(v-else)
      v-tabs#gamecurrent-tabs(v-model="activeTab", :light="true")
        v-tabs-bar(slot="activators")
          v-tabs-slider
          v-tabs-item(:key="1" href="#game" ripple) {{ $t('game') }}
          v-tabs-item(:key="2" href="#pro-builds" ripple) {{ $t('proBuilds') }}
        v-tabs-content#game(:key="1")
          v-card-text
            div.d-flex.flex-column.align-items-center.flex-sm-row
              map-image.rounded.mr-3.mb-3(:map-id='gameCurrent.mapId')
              div.gameData
                .row
                  .col-4
                    b {{ $t('map' )}}
                  .col-8
                    div {{ $t(`mapsIds[${gameCurrent.mapId}]`)}}
                .row
                  .col-4
                    b {{ $t('queue' )}}
                  .col-8
                    div {{ $t(`queuesIds[${gameCurrent.gameQueueConfigId}]`) }}
                .row
                  .col-4
                    b {{ $t('region' )}}
                  .col-8
                    div {{ $t(`regionsAbbrs.${gameCurrent.region}`) }}

            team-header(:team-id='100')
            participant(v-for='participant, idx in blueParticipants', :key='idx', :participant='participant', @click-runes='handleOnClickRunes', @click-masteries='handleOnClickMasteries')
            div.d-flex.align-items-center.mt-2(v-if='gameCurrent.bannedChampions.length > 0')
              .u-flexer
              b.text-secondary.mr-2 {{ $t('bans') }}:
              div.mx-2(v-for='ban in blueBans')
                champion-image.bannedChampionImage.rounded(:champion-id='ban.championId')
            team-header(:team-id='200')
            participant(v-for='participant, idx in redPariticpants', :key='idx', :participant='participant', @click-runes='handleOnClickRunes', @click-masteries='handleOnClickMasteries')
            div.d-flex.align-items-center.mt-2(v-if='gameCurrent.bannedChampions.length > 0')
              div.u-flexer
              b.text-secondary.mr-2 {{ $t('bans') }}:
              div.mx-2(v-for='ban in redBans')
                champion-image.bannedChampionImage.rounded(:champion-id='ban.championId')
        v-tabs-content#pro-builds(:key="2")
          v-card-text
            error-view(v-if='proBuildsState.fetchError', @press-retry='handleOnClickRetryBuilds', :message='proBuildsState.errorMessage')
            error-view(v-else-if='proBuilds.length === 0', :message="$t('resultsNotFound')", :retry-button='false')
            template(v-else)
              pro-builds-list.mb-4(:builds='proBuilds')
              loading-indicator.m2(v-if='proBuildsState.fetching')
              load-more-button(v-else-if='hasMorePages', @click.native='loadMore')
    v-dialog(:value="showDialog")
      v-card
        v-card-text
          rune-page(v-if='runesSelected !== null', :runes='runesSelected')
          mastery-page(v-if='masteriesSelected !== null', :masteries='masteriesSelected')
    scroll-up-button
</template>

<script>
  import { filter, get } from 'lodash';
  import { mapState, mapGetters, mapActions } from 'vuex';

  import {
    LoadingIndicator,
    ChampionImage,
    MapImage,
    MasteryPage,
    RunePage,
    ProBuildsList,
    ScrollUpButton,
    ErrorView,
    LoadMoreButton,
    LoadingView,
  } from '../../components';
  import Participant from './Participant.vue';
  import TeamHeader from './TeamHeader.vue';

  export default {
    name: 'GameCurrentView',

    fetch({ params, store }) {
      return store.dispatch('gameCurrent/fetchGame', params.summonerId)
        .then(() => {
          store.dispatch('proBuilds/setFilters', { championId: store.state.gameCurrent.focusChampionId });

          return store.dispatch('proBuilds/fetchBuilds', { pageNumber: 1 });
        })
        .catch(() => false);
    },

    data: () => ({
      runesSelected: null,
      masteriesSelected: null,
      activeTab: 'game',
      showDialog: false,
    }),

    computed: {
      ...mapState({
        gameCurrentState: state => state.gameCurrent,
        proBuildsState: state => state.proBuilds,
      }),

      ...mapGetters({
        gameCurrent: 'gameCurrent/data',
        proBuilds: 'proBuilds/list',
        hasMorePages: 'proBuilds/hasMorePages',
      }),

      blueParticipants() {
        return filter(get(this.gameCurrent, ['participants']), { teamId: 100 });
      },

      redPariticpants() {
        return filter(get(this.gameCurrent, ['participants']), { teamId: 200 });
      },

      blueBans() {
        return filter(get(this.gameCurrent, ['bannedChampions']), { teamId: 100 });
      },

      redBans() {
        return filter(get(this.gameCurrent, ['bannedChampions']), { teamId: 200 });
      },
    },

    methods: {
      ...mapActions({
        fetchBuilds: 'proBuilds/fetchBuilds',
        setBuildsFilter: 'proBuilds/setFilters',
      }),

      handleOnClickRunes({ runes }) {
        this.masteriesSelected = null;
        this.runesSelected = runes;
        this.showDialog = true;
      },

      handleOnClickMasteries({ masteries }) {
        this.runesSelected = null;
        this.masteriesSelected = masteries;
        this.showDialog = true;
      },

      handleOnClickRetryBuilds() {
        this.fetchBuilds();
      },

      loadMore() {
        if (this.hasMorePages) {
          this.fetchBuilds();
        }
      },
    },

    components: {
      LoadingIndicator,
      Participant,
      TeamHeader,
      ChampionImage,
      MapImage,
      RunePage,
      MasteryPage,
      ProBuildsList,
      ScrollUpButton,
      ErrorView,
      LoadMoreButton,
      LoadingView,
    },
  };
</script>

<style lang="scss" scoped>
  .GameCurrentView {
    .gameInfoTable {
      margin-top: -0.25em;

      tr:first-child {
        td, th { border-top: none }
      }
    }
    .bannedChampionImage {
      width: 2em !important;
      height: 2em !important;
    }
  }
</style>

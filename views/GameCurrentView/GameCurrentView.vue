<template lang="pug">
  preload-page(
    v-if="gameCurrentState.fetching || gameCurrentState.fetchError"
    :fetching="gameCurrentState.fetching"
    :fetchError="gameCurrentState.fetchError"
    :message="gameCurrentState.errorMessage"
    :retryButton="false"
  )
  .GameCurrentView.container(v-else-if="gameCurrentState.fetched")
    adsense.googleAd.mx-auto.mb-4(ad-style='display:block', ad-client='ca-pub-9850680385333731', ad-slot='3550650408', ad-format='horizontal')
    v-card.animated.fadeIn
      v-tabs#gamecurrent-tabs(v-model="activeTab", :light="true")
        v-tabs-bar(slot="activators")
          v-tabs-slider
          v-tabs-item(:key="1" href="#game" ripple) {{ $t('game') }}
          v-tabs-item(:key="2" href="#pro-builds" ripple) {{ $t('proBuilds') }}
        v-tabs-content#game(:key="1")
          v-card-text
            div.d-flex.flex-column.flex-sm-row
              map-image.hidden-xs-down.mr-3(:map-id='gameCurrent.mapId')
              div.text-nowrap
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
            template(v-if="proBuilds.length === 0")
              error-view(v-if="proBuildsState.fetched" :message="$t('noProBuildsResults')" :retry-button="false")
              error-view(v-else-if="proBuildsState.fetchError" :message="proBuildsState.errorMessage" @retry="handleOnRetryFetchBuilds")
                loading-indicator.mb-2
            template(v-else)
              pro-builds-list(class="mb-4" :builds="proBuilds")
              loading-indicator(v-if="proBuildsState.fetching" class="m2")
              load-more-button(v-else-if="hasMorePages" @click.native="loadMore")
    v-dialog(v-model="showDialog", :scrollable="true", width="auto")
      v-card
        v-card-row.p-4
          rune-page(v-if="runesSelected != null", :runes='runesSelected')
          mastery-page(v-if='masteriesSelected != null', :masteries='masteriesSelected')
    scroll-up-button
</template>

<script>
  import moment from 'moment';
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
    Adsense,
  } from '../../components';
  import PreloadPage from '../../components/PreloadPage.vue';
  import Participant from './Participant.vue';
  import TeamHeader from './TeamHeader.vue';

  const CACHE_SECONDS = 200;

  export default {
    name: 'GameCurrentView',

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
      Adsense,
      PreloadPage,
    },

    fetch({ params, store }) {
      return new Promise((resolve) => {
        const gameCurrentState = store.state.gameCurrent;

        if (
          gameCurrentState.fetched &&
          params.summonerId === gameCurrentState.summonerId &&
          moment().diff(gameCurrentState.fetchedAt, 'seconds') < CACHE_SECONDS
        ) {
          resolve();
        } else {
          store.dispatch('gameCurrent/fetchGame', params.summonerId)
            .then(() => {
              store.dispatch('proBuilds/setFilters', { championId: store.getters['gameCurrent/focusChampionId'] });

              return store.dispatch('proBuilds/fetchBuilds', { pageNumber: 1 });
            })
            .then(resolve)
            .catch(() => {
              resolve();
            });
        }
      });
    },

    head() {
      return {
        title: `${this.$t('currentGame')} | Coloso.net`,
        meta: [
          { hid: 'robots', name: 'robots', content: 'noindex' },
        ],
      };
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
      }),

      handleOnClickRunes({ runes }) {
        this.masteriesSelected = null;
        this.runesSelected = runes;
        // Se usa un timeout debido a un bug en vuetify
        setTimeout(() => {
          this.showDialog = true;
        }, 100);
      },

      handleOnClickMasteries({ masteries }) {
        this.runesSelected = null;
        this.masteriesSelected = masteries;
        // Se usa un timeout debido a un bug en vuetify
        setTimeout(() => {
          this.showDialog = true;
        }, 100);
      },

      handleOnRetryFetchBuilds() {
        this.fetchBuilds();
      },

      loadMore() {
        if (this.hasMorePages) {
          this.fetchBuilds();
        }
      },
    },
  };
</script>

<style lang="stylus" scoped>
  .GameCurrentView
    .gameInfoTable
      margin-top: -0.25em

      tr:first-child
        td
        th
          border-top: none

    .bannedChampionImage
      width: 2em !important
      height: 2em !important
</style>

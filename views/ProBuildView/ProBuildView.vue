<template lang="pug">
  .ProBuildView.container
    loading-view(v-if='buildState.fetching')
    error-view(v-else-if='buildState.fetchError', @retry='fetchBuild', :message='buildState.errorMessage')
    .row(v-else)
      .col-12.col-md-4.col-xl-3
        v-card.mb-4.animated.fadeIn
          v-card-text
            pro-player(:player='proPlayer')
        adsense.googleAd.mx-auto.mb-4(ad-style='display:block', ad-client='ca-pub-9850680385333731', ad-slot='3550650408', ad-format='rectangle,horizontal')
      .col-12.col-md-8.col-xl-9
        v-card.mb-4.animated.fadeIn
          v-card-text
            build-summary(:build='build')
        v-card.animated.fadeIn.overflow-x-hidden
          v-tabs#probuild-tabs(v-model="activeTab", :light="true")
            v-tabs-bar(slot="activators")
              v-tabs-slider
              v-tabs-item(href="#build" ripple) {{ $t('build') }}
              v-tabs-item(href="#runes" ripple) {{ $t('runes') }}
              v-tabs-item(href="#masteries" ripple) {{ $t('masteries') }}
              v-tabs-item(href="#game" ripple) {{ $t('game') }}
            v-tabs-content#build
              v-card-text
                h6
                  strong.text-primary {{ $t('skills') }}
                skills-order(:champion-id='build.champion.id', :skills='build.skillsOrder')
                h6.my-4
                  strong.text-primary {{ $t('items') }}
                items-order(:items='build.itemsOrder')
            v-tabs-content#runes
              v-card-text.d-flex.justify-content-center
                rune-page.hidden-lg-up(:runes='build.runes')
                circular-rune-page.hidden-md-down(:runes='build.runes')
            v-tabs-content#masteries
              v-card-text
                mastery-page(:masteries='build.masteries')
            v-tabs-content#game
              v-card-text
                loading-indicator(v-if='!gameState.fetched')
                error-view(v-else-if='gameState.fetchError', @retry='fetchGame', :message='gameState.errorMessage')
                game(v-else, :game='game')
</template>

<script>
  import { get, assign } from 'lodash';
  import { mapActions, mapGetters, mapState } from 'vuex';
  import { LoadingIndicator, MasteryPage, RunePage, CircularRunePage, ErrorView, Adsense, LoadingView } from '../../components';
  import { promiseReflector } from '../../utils';
  import ProPlayer from './ProPlayer.vue';
  import BuildSummary from './BuildSummary.vue';
  import SkillsOrder from './SkillsOrder.vue';
  import ItemsOrder from './ItemsOrder.vue';
  import Game from './Game';

  export default {
    name: 'ProBuildView',

    fetch({ store, params }) {
      return promiseReflector(store.dispatch('proBuild/fetchById', params.buildId));
    },

    head() {
      let title = `${this.$t('proBuild')} | Coloso.net`;
      let description = this.$t('viewsDescriptions.home');

      if (this.buildState.fetched) {
        description = this.$t('viewsDescriptions.proBuild', {
          championName: this.build.champion.name,
          proPlayerName: this.build.proSummoner.proPlayer.name,
        });

        title = this.$t('viewsTitles.proBuild', {
          championName: this.build.champion.name,
          proPlayerName: this.build.proSummoner.proPlayer.name,
        });
      }

      return {
        title,
        meta: [
          { hid: 'description', name: 'description', content: description },
        ],
      };
    },

    data() {
      return {
        activeTab: 'build',
      };
    },

    mounted() {
      this.setTabByHash();
    },

    computed: {
      ...mapGetters({
        build: 'proBuild/data',
        game: 'game/data',
      }),

      ...mapState({
        buildState: state => state.proBuild,
        gameState: state => state.game,
      }),

      proPlayer() {
        const playerData = get(this.build, ['proSummoner', 'proPlayer']);

        assign(playerData, {
          summonerId: this.build.proSummoner.summonerId,
        });

        return playerData;
      },
    },

    methods: {
      ...mapActions({
        fetchGameData: 'game/fetchById',
        fetchBuildData: 'proBuild/fetchById',
      }),

      handleOnChangeTab(idx) {
        if (!this.gameState.fetching && (idx === 3)) {
          this.fetchGame(this.build.gameId);
        }
      },

      fetchBuild() {
        this.fetchBuildData(this.$route.params.buildId);
      },

      fetchGame() {
        this.fetchGameData(this.build.gameId);
      },

      setTabByHash() {
        const validHashes = ['build', 'runes', 'masteries', 'game'];
        const hash = window.location.hash.replace('#', '');

        if (validHashes.includes(hash)) {
          this.activeTab = hash;
        }
      },
    },

    watch: {
      activeTab(name) {
        if (name === 'game' && !this.gameState.fetching && this.build.gameId !== this.gameState.id) {
          this.fetchGame();
        }
      },
    },

    components: {
      LoadingIndicator,
      ProPlayer,
      BuildSummary,
      SkillsOrder,
      ItemsOrder,
      MasteryPage,
      RunePage,
      CircularRunePage,
      Game,
      ErrorView,
      Adsense,
      LoadingView,
    },
  };
</script>

<style lang="scss" scoped>
</style>

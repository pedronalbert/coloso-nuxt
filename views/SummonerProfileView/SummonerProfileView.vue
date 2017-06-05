<template lang="pug">
  preload-page(
    v-if="summonerState.fetching || summonerState.fetchError"
    :fetching="summonerState.fetching"
    :fetchError="summonerState.fetchError"
    :message="summonerState.errorMessage"
    retryButton,
    @retry="handleOnRetryFetchAll"
  )
  div.container(v-else-if="summonerState.fetched")
    div.row
      div(class="col-12 col-md-5 col-lg-4")
        v-card(class="mb-4 animated fadeIn")
          v-card-text
            summoner-data(:summoner="summoner", :playing="summonerState.gameCurrentStatus.playing", @click-game-current="goToCurrentGame")

        v-card(class="mb-4 animated fadeIn")
          v-card-text
            league-entries(v-if="summonerState.leagueEntries.fetched" :entries="leagueEntries.entries")
            loading-indicator(v-else-if="summonerState.leagueEntries.fetching")
            error-view(v-else-if="summonerState.leagueEntries.fetchError" :message="summonerState.leagueEntries.errorMessage", @retry="handleOnRetryFetchLeagueEntries")

        adsense(
          class="googleAd mx-auto mb-4"
          ad-style="display:block"
          ad-client="ca-pub-9850680385333731"
          ad-slot="3550650408"
          ad-format="rectangle,horizontal"
        )

      div(class="col-12 col-md-7 col-lg-8")
        v-card.animated.fadeIn.overflow-x-hidden
          v-tabs#summoner-tabs(v-model="activeTab", :light="true")
            v-tabs-bar(slot="activators")
              v-tabs-slider
              v-tabs-item(href="#history" ripple) {{ $t('history') }}
              v-tabs-item(href="#champions" ripple) {{ $t('champions') }}
              v-tabs-item(href="#runes" ripple) {{ $t('runes') }}
              v-tabs-item(href="#masteries" ripple) {{ $t('masteries') }}
            v-tabs-content#history
              v-card-text
                games-recent(v-if="summonerState.gamesRecent.fetched" :games="gamesRecent.games")
                loading-indicator(v-else-if="summonerState.gamesRecent.fetching")
                error-view(v-else-if="summonerState.gamesRecent.fetchError" :message="summonerState.gamesRecent.errorMessage", @retry="handleOnRetryFetchGamesRecent")

            v-tabs-content#champions
              v-card-text
                champions-masteries(v-if="summonerState.championsMasteries.fetched" :masteries="championsMasteries.masteries")
                loading-indicator(v-else-if="summonerState.championsMasteries.fetching")
                error-view(v-else-if="summonerState.championsMasteries.fetchError" :message="summonerState.championsMasteries.errorMessage", @retry="handleOnRetryFetchChampionsMasteries")

            v-tabs-content#runes
              v-card-text
                runes(v-if="summonerState.runes.fetched" :pages="runes.pages")
                loading-indicator(v-else-if="summonerState.runes.fetching")
                error-view(v-else-if="summonerState.runes.fetchError" :message="summonerState.runes.errorMessage", @retry="handleOnRetryFetchRunes")

            v-tabs-content#masteries
              v-card-text
                masteries(v-if="summonerState.masteries.fetched" :pages="masteries.pages")
                loading-indicator(v-else-if="summonerState.masteries.fetching")
                error-view(v-else-if="summonerState.masteries.fetchError" :message="summonerState.masteries.errorMessage", @retry="handleOnRetryFetchMasteries")
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex';
  import { LoadingIndicator, Adsense, LoadingView, ErrorView } from '../../components';
  import PreloadPage from '../../components/PreloadPage.vue';
  import { promiseReflector } from '../../utils';

  import SummonerData from './SummonerData.vue';
  import LeagueEntries from './LeagueEntries.vue';
  import ChampionsMasteries from './ChampionsMasteries.vue';
  import Runes from './Runes.vue';
  import Masteries from './Masteries.vue';
  import GamesRecent from './GamesRecent.vue';

  export default {
    name: 'SummonerProfileview',

    components: {
      LoadingIndicator,
      SummonerData,
      LeagueEntries,
      ChampionsMasteries,
      Runes,
      Masteries,
      GamesRecent,
      Adsense,
      LoadingView,
      ErrorView,
      PreloadPage,
    },

    fetch({ params, store }) {
      const summonerId = params.summonerId;

      return Promise.all([
        promiseReflector(store.dispatch('summoner/fetchById', summonerId)),
        promiseReflector(store.dispatch('summoner/gamesRecent/fetchById', summonerId)),
        promiseReflector(store.dispatch('summoner/leagueEntries/fetchById', summonerId)),
      ]);
    },

    head() {
      let title = `${this.$t('summonerProfile')} | Coloso.net`;
      let description = this.$t('viewsDescriptions.home');

      if (this.summonerState.fetched) {
        title = `${this.summoner.name} - ${this.summoner.region.toUpperCase()} | Coloso.net`;

        description = this.$t('viewsDescriptions.summonerProfile', {
          summonerName: this.summoner.name,
          region: this.summoner.region.toUpperCase(),
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
        activeTab: 'history',
      };
    },

    mounted() {
      this.fetchInClientData();
    },

    computed: {
      ...mapState({
        summonerState: state => state.summoner,
      }),

      ...mapGetters({
        summoner: 'summoner/data',
        leagueEntries: 'summoner/leagueEntries/data',
        championsMasteries: 'summoner/championsMasteries/data',
        runes: 'summoner/runes/data',
        masteries: 'summoner/masteries/data',
        gamesRecent: 'summoner/gamesRecent/data',
      }),

      summonerId() {
        return this.$route.params.summonerId;
      },
    },

    methods: {
      ...mapActions({
        fetchSummoner: 'summoner/fetchById',
        fetchLeagueEntries: 'summoner/leagueEntries/fetchById',
        fetchChampionsMasteries: 'summoner/championsMasteries/fetchById',
        fetchRunes: 'summoner/runes/fetchById',
        fetchMasteries: 'summoner/masteries/fetchById',
        fetchGamesRecent: 'summoner/gamesRecent/fetchById',
        checkGameCurrentStatus: 'summoner/gameCurrentStatus/check',
      }),

      handleOnRetryFetchSummoner() {
        this.fetchSummoner(this.summonerId);
      },

      handleOnRetryFetchLeagueEntries() {
        this.fetchLeagueEntries(this.summonerId);
      },

      handleOnRetryFetchChampionsMasteries() {
        this.fetchChampionsMasteries(this.summonerId);
      },

      handleOnRetryFetchRunes() {
        this.fetchRunes(this.summonerId);
      },

      handleOnRetryFetchMasteries() {
        this.fetchMasteries(this.summonerId);
      },

      handleOnRetryFetchGamesRecent() {
        this.fetchGamesRecent(this.summonerId);
      },

      handleOnRetryFetchAll() {
        this.handleOnRetryFetchSummoner();
        this.handleOnRetryFetchLeagueEntries();
        this.handleOnRetryFetchChampionsMasteries();
        this.handleOnRetryFetchRunes();
        this.handleOnRetryFetchMasteries();
        this.handleOnRetryFetchGamesRecent();
      },

      goToCurrentGame() {
        this.$router.push({
          path: `/current-game/${this.summonerId}`,
        });
      },

      fetchInClientData() {
        this.fetchChampionsMasteries(this.summonerId);
        this.fetchRunes(this.summonerId);
        this.fetchMasteries(this.summonerId);
        this.checkGameCurrentStatus(this.summonerId);
      },
    },

    watch: {
      summonerId(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.fetchInClientData();
        }
      },
    },
  };
</script>

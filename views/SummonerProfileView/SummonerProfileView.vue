<template lang="pug">
  div.container
    loading-indicator(v-if="summonerState.fetching")
    error-view(v-else-if="summonerState.fetchError" :message="summonerState.errorMessage" @retry="handleOnRetryFetchAll")
    div(v-else class="row")
      div(class="col-md-5 col-lg-4")
        v-card(class="mb-4 animated fadeIn")
          v-card-text
            summoner-data(:summoner="summoner")

        v-card(class="mb-4 animated fadeIn")
          v-card-text
            loading-indicator(v-if="summonerState.leagueEntries.fetching")
            error-view(v-else-if="summonerState.leagueEntries.fetchError" :message="summonerState.leagueEntries.errorMessage", @retry="handleOnRetryFetchLeagueEntries")
            league-entries(v-else :entries="leagueEntries.entries")

        adsense(
          class="googleAd mx-auto mb-4"
          ad-style="display:block"
          ad-client="ca-pub-9850680385333731"
          ad-slot="3550650408"
          ad-format="rectangle,horizontal"
        )

      div(class="col-md-7 col-lg-8")
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
                loading-indicator(v-if="summonerState.gamesRecent.fetching")
                error-view(v-else-if="summonerState.gamesRecent.fetchError" :message="summonerState.gamesRecent.errorMessage", @retry="handleOnRetryFetchGamesRecent")
                games-recent(v-else :games="gamesRecent.games")

            v-tabs-content#champions
              v-card-text
                loading-indicator(v-if="summonerState.championsMasteries.fetching")
                error-view(v-else-if="summonerState.championsMasteries.fetchError" :message="summonerState.championsMasteries.errorMessage", @retry="handleOnRetryFetchChampionsMasteries")
                champions-masteries(v-else :masteries="championsMasteries.masteries")

            v-tabs-content#runes
              v-card-text
                loading-indicator(v-if="summonerState.runes.fetching")
                error-view(v-else-if="summonerState.runes.fetchError" :message="summonerState.runes.errorMessage", @retry="handleOnRetryFetchRunes")
                runes(v-else :pages="runes.pages")

            v-tabs-content#masteries
              v-card-text
                loading-indicator(v-if="summonerState.masteries.fetching")
                error-view(v-else-if="summonerState.masteries.fetchError" :message="summonerState.masteries.errorMessage", @retry="handleOnRetryFetchMasteries")
                masteries(v-else :pages="masteries.pages")
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex';
  import { LoadingIndicator, Adsense, LoadingView, ErrorView } from '../../components';
  import { promiseReflector } from '../../utils';

  import SummonerData from './SummonerData.vue';
  import LeagueEntries from './LeagueEntries.vue';
  import ChampionsMasteries from './ChampionsMasteries.vue';
  import Runes from './Runes.vue';
  import Masteries from './Masteries.vue';
  import GamesRecent from './GamesRecent.vue';

  export default {
    name: 'SummonerProfileview',

    fetch({ params, store }) {
      const summonerId = params.summonerId;

      return Promise.all([
        promiseReflector(store.dispatch('summoner/fetchById', summonerId)),
        promiseReflector(store.dispatch('summoner/championsMasteries/fetchById', summonerId)),
        promiseReflector(store.dispatch('summoner/gamesRecent/fetchById', summonerId)),
        promiseReflector(store.dispatch('summoner/leagueEntries/fetchById', summonerId)),
        promiseReflector(store.dispatch('summoner/masteries/fetchById', summonerId)),
        promiseReflector(store.dispatch('summoner/runes/fetchById', summonerId)),
      ]);
    },

    data() {
      return {
        activeTab: 'history',
      };
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
    },

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
    },
  };
</script>

<style lang="scss" scoped>
</style>

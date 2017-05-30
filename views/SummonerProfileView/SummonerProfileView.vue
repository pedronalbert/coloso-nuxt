<template lang="pug">
  div.container
    error-view(v-if="summonerState.fetchError" :message="summonerState.errorMessage" :retry-button="false")
    div(v-else class="row")
      div(class="col-md-5 col-lg-4")
        v-card(class="mb-4 animated fadeIn")
          v-card-text
            summoner-data(:summoner="summoner")

        v-card(class="mb-4 animated fadeIn")
          v-card-text
            loading-indicator(v-if="summonerState.leagueEntries.fetching")
            error-view(v-else-if="summonerState.leagueEntries.fetchError" :message="summonerState.leagueEntries.errorMessage")
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
                error-view(v-else-if="summonerState.gamesRecent.fetchError" :message="summonerState.gamesRecent.errorMessage")
                games-recent(v-else :games="gamesRecent.games")

            v-tabs-content#champions
              v-card-text
                loading-indicator(v-if="summonerState.championsMasteries.fetching")
                error-view(v-else-if="summonerState.championsMasteries.fetchError" :message="summonerState.championsMasteries.errorMessage")
                champions-masteries(v-else :masteries="championsMasteries.masteries")

            v-tabs-content#runes
              v-card-text
                loading-indicator(v-if="summonerState.runes.fetching")
                error-view(v-else-if="summonerState.runes.fetchError" :message="summonerState.runes.errorMessage")
                runes(v-else :pages="runes.pages")

            v-tabs-content#masteries
              v-card-text
                loading-indicator(v-if="summonerState.masteries.fetching")
                error-view(v-else-if="summonerState.masteries.fetchError" :message="summonerState.masteries.errorMessage")
                masteries(v-else :pages="masteries.pages")
</template>

<script>
  import { mapState, mapGetters } from 'vuex';
  import { LoadingIndicator, Adsense, LoadingView, ErrorView } from '../../components';

  import SummonerData from './SummonerData.vue';
  import LeagueEntries from './LeagueEntries.vue';
  import ChampionsMasteries from './ChampionsMasteries.vue';
  import Runes from './Runes.vue';
  import Masteries from './Masteries.vue';
  import GamesRecent from './GamesRecent.vue';

  function reflect(promise) {
    return new Promise((resolve) => {
      promise
        .then(resolve)
        .catch(resolve);
    });
  }

  export default {
    name: 'SummonerProfileview',

    fetch({ params, store }) {
      const summonerId = params.summonerId;

      return Promise.all([
        reflect(store.dispatch('summoner/fetchById', summonerId)),
        reflect(store.dispatch('summoner/championsMasteries/fetchById', summonerId)),
        reflect(store.dispatch('summoner/gamesRecent/fetchById', summonerId)),
        reflect(store.dispatch('summoner/leagueEntries/fetchById', summonerId)),
        reflect(store.dispatch('summoner/masteries/fetchById', summonerId)),
        reflect(store.dispatch('summoner/runes/fetchById', summonerId)),
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

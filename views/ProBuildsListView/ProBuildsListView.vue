<template lang="pug">
  div.container
    v-card(class="animated fadeIn")
      v-card-text
        div(class="d-flex flex-wrap justify-content-around mb-4")
          champion-selector(
            class="selector"
            :value="proBuildsState.filters.championId"
            @input="handleOnChangeChampion"
          )

          pro-player-selector(
            class="selector"
            :value="proBuildsState.filters.proPlayerId"
            @input="handleOnChangeProPlayer"
            :players="proPlayers"
          )

        template(v-if="proBuilds.length === 0")
          error-view(v-if="proBuildsState.fetched" :message="$t('noProBuildsResults')" :retry-button="false")
          error-view(v-else-if="proBuildsState.fetchError" :message="proBuildsState.errorMessage" @retry="handleOnRetryFetchBuilds")
          loading-indicator.mb-2(v-else)
        template(v-else)
          pro-builds-list(class="mb-4" :builds="proBuilds")
          loading-indicator(v-if="proBuildsState.fetching" class="m2")
          load-more-button(v-else-if="hasMorePages" @click.native="loadMore")
    scroll-up-button
</template>

<script>
  import { mapActions, mapState, mapGetters } from 'vuex';
  import { isNull } from 'lodash';
  import {
    ProBuildsList,
    LoadingIndicator,
    ChampionSelector,
    ProPlayerSelector,
    ErrorView,
    LoadMoreButton,
    ScrollUpButton,
    LoadingView,
  } from '../../components';
  import { promiseReflector } from '../../utils';


  function needsFetchProBuilds(state) {
    if (state.fetched &&
      state.pagination.currentPage >= 1 &&
      isNull(state.filters.championId) &&
      isNull(state.filters.proPlayerId)
    ) {
      return false;
    }

    return true;
  }

  function needsFetchProPlayers(state) {
    return !state.fetched;
  }

  export default {
    name: 'ProBuildsListView',

    head() {
      return {
        title: `${this.$t('proBuilds')} | Coloso.net`,
        meta: [
          { hid: 'description', name: 'description', content: this.$t('viewsDescriptions.proBuildsList') },
        ],
      };
    },

    fetch({ store }) {
      const fetchPromises = [];

      if (needsFetchProBuilds(store.state.proBuilds)) {
        fetchPromises.push(promiseReflector(store.dispatch('proBuilds/fetchBuilds', { pageNumber: 1 })));
      }

      if (needsFetchProPlayers(store.state.proPlayers)) {
        fetchPromises.push(promiseReflector(store.dispatch('proPlayers/fetch')));
      }

      return Promise.all(fetchPromises);
    },

    computed: {
      ...mapState({
        proBuildsState: state => state.proBuilds,
        proPlayersState: state => state.proPlayers,
      }),

      ...mapGetters({
        proPlayers: 'proPlayers/list',
        proBuilds: 'proBuilds/list',
        hasMorePages: 'proBuilds/hasMorePages',
      }),
    },

    methods: {
      ...mapActions({
        fetchBuilds: 'proBuilds/fetchBuilds',
        setFilters: 'proBuilds/setFilters',
        fetchProPlayers: 'proPlayers/fetch',
      }),

      loadMore() {
        if (this.hasMorePages) {
          this.fetchBuilds({ pageNumber: this.proBuildsState.pagination.currentPage + 1 });
        }
      },

      handleOnChangeChampion(championId) {
        this.setFilters({ championId });
        this.fetchBuilds();
      },

      handleOnChangeProPlayer(proPlayerId) {
        this.setFilters({ proPlayerId });
        this.fetchBuilds();
      },

      handleOnRetryFetchBuilds() {
        this.fetchBuilds();
      },
    },

    components: {
      ProBuildsList,
      LoadingIndicator,
      ChampionSelector,
      ProPlayerSelector,
      ErrorView,
      ScrollUpButton,
      LoadMoreButton,
      LoadingView,
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/mixins';

  .selector {
    width: 300px !important;

    &:first-child {
      margin-bottom: 8px;
    }
  }
</style>

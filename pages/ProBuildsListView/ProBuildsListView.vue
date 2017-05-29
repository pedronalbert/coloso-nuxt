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

        loading-indicator.mb2(v-if="proBuildsState.fetching && proBuilds.length === 0")
        error-view(v-else-if="proBuilds.length === 0" :message="$t('resultsNotFound')" :retry-button="false")
        template(v-else)
          pro-builds-list(class="mb-4" :builds="proBuilds")
          loading-indicator(v-if="proBuildsState.fetching" class="m2")
          load-more-button(v-else-if="hasMorePages" @click.native="loadMore")
    scroll-up-button
</template>

<script>
  import { mapActions, mapState, mapGetters } from 'vuex';
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

  export default {
    name: 'ProBuildsListView',

    created() {
      if (process.BROWSER_BUILD) {
        if (!this.proBuildsState.fetched) {
          this.fetchBuilds();
        }

        if (!this.proPlayersState.fetched) {
          this.fetchProPlayers();
        }
      }
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

      handleOnClickRetry() {
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

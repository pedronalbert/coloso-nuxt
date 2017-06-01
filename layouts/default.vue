<template lang="pug">
  div.d-flex.flex-column.h-100
    app-nav(
      :summoner-name="summonerName",
      :region="region",
      :fetching="fetching"
      :render-form="renderNavForm"
      @change-region="handleOnChangeRegion"
      @change-summoner="handleOnChangeSummoner"
      @submit="handleOnSubmit"
    )
    .routerContainer
      nuxt/
    app-footer
</template>

<script>
  import moment from 'moment';
  import { mapActions, mapState } from 'vuex';
  import { AppNav, AppFooter } from '../components';
  import ColosoClient from '../utils/ColosoClient';

  export default {
    components: {
      AppNav,
      AppFooter,
    },

    created() {
      moment.locale(this.locale);
      ColosoClient.defaults.headers.common['Accept-Language'] = this.locale;
    },

    computed: {
      ...mapState({
        summonerName: state => state.search.summonerName,
        region: state => state.search.region,
        fetching: state => state.search.fetching,
        locale: state => state.locale,
      }),

      renderNavForm() {
        if (this.$route.path === '/') {
          return false;
        }

        return true;
      },
    },

    methods: {
      ...mapActions({
        searchSummoner: 'search/searchSummoner',
        setParams: 'search/setParams',
      }),

      handleOnChangeRegion(region) {
        this.setParams({ region });
      },

      handleOnChangeSummoner(summonerName) {
        this.setParams({ summonerName });
      },

      handleOnSubmit() {
        this.searchSummoner({
          summonerName: this.summonerName,
          region: this.region,
        })
          .then(({ summonerId }) => {
            this.$router.push({ path: `/summoners/${summonerId}` });
          })
          .catch(({ message }) => {
            window.swal({
              title: '',
              text: message,
              imageUrl: '/images/stickers/poro-question.png',
              imageWidth: 130,
              confirmButtonClass: 'btn--dark btn--raised accent',
            });
          });
      },
    },
  };
</script>

<style lang="scss">
  .routerContainer {
    flex: 1;
    width: 100%;
    min-width: 100%;
    max-width: 100%;
  }
</style>

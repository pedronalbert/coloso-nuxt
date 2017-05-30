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
    nuxt.u-flexer/
    app-footer
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import { AppNav, AppFooter } from '../components';

  export default {
    components: {
      AppNav,
      AppFooter,
    },

    computed: {
      ...mapState({
        summonerName: state => state.search.summonerName,
        region: state => state.search.region,
        fetching: state => state.search.fetching,
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

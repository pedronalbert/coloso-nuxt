<template lang="pug">
  .HomeView
    .headerContainer.d-flex.flex-column.elevation-2
      .iconContainer
        img.colosoIcon(src='/images/coloso_icon.png', alt='Coloso')
        .alphaBadge
          | ßeta
      .SearchControls
        template(v-if="searchState.fetching")
          .h-100.d-flex.justify-content-center.align-items-center
            loading-indicator(theme='white')
        template(v-else)
          form.formControls(@submit.prevent='handleOnSubmit')
            summoner-input(:summoner='summonerName', :region='region', @change-summoner='handleOnChangeSummoner', @change-region='handleOnChangeRegion', @submit='handleOnSubmit')
            .radiosContainer
              .radioRow.align-items-center
                v-radio.radioButton(:light="true" v-model="searchType", :hide-details="true" value="PROFILE")
                | {{ $t('summonerProfile') }}
              .radioRow.align-items-center
                v-radio.radioButton(:light="true" v-model="searchType", :hide-details="true" value="GAME")
                | {{ $t('currentGame') }}
    .contentContainer.container
      loading-view(v-if='proBuildsState.fetching')
      error-view(v-else-if='proBuildsState.fetchError', :message='proBuildsState.errorMessage', :retry-button='false')
      v-card.animated.fadeIn(v-else)
        v-card-text
          .title.text-primary.mb-3
            | {{ $t('lastProBuilds') }}
          pro-builds-list(:builds='builds')
</template>

<script>
  import { mapActions, mapGetters, mapState } from 'vuex';

  import { AppNav, SummonerInput, ErrorView, LoadingView, ProBuildsList, LoadingIndicator } from '../../components';
  import { getRiotRegionByUserIp } from '../../utils';

  function showModal(message) {
    window.swal({
      title: '',
      text: message,
      imageUrl: '/images/stickers/poro-question.png',
      imageWidth: 130,
      confirmButtonClass: 'btn--dark btn--raised accent',
    });
  }

  export default {
    name: 'HomeView',

    fetch({ store }) {
      return store.dispatch('proBuilds/fetchBuilds', { pageNumber: 1 });
    },

    created() {
      if (process.BROWSER_BUILD) {
        getRiotRegionByUserIp()
          .then((region) => {
            if (this.summonerName === '') {
              this.setParams({ region });
            }
          })
          .catch(() => {
            window.console.info('Can\'t set default region by IP');
          });
      }
    },

    data() {
      return {
        searchType: 'PROFILE',
      };
    },

    computed: {
      ...mapState({
        searchState: state => state.search,
        proBuildsState: state => state.proBuilds,
        summonerName: state => state.search.summonerName,
        region: state => state.search.region,
      }),

      ...mapGetters('proBuilds', {
        builds: 'lastBuildsList',
      }),
    },

    methods: {
      ...mapActions({
        fetchBuilds: 'proBuilds/fetchBuilds',
        setBuildsFilters: 'proBuilds/setFilters',
        searchSummoner: 'search/searchSummoner',
        searchGame: 'search/searchGame',
        setParams: 'search/setParams',
      }),

      handleOnChangeRegion(region) {
        this.setParams({ region });
      },

      handleOnChangeSummoner(summonerName) {
        this.setParams({ summonerName });
      },

      handleOnSubmit() {
        if (this.searchType === 'PROFILE') {
          this.searchSummoner({ summonerName: this.summonerName, region: this.region })
            .then(({ summonerId }) => {
              this.$router.push({ path: `/summoners/${summonerId}` });
            })
            .catch(({ message }) => {
              showModal(message);
            });
        } else {
          this.searchGame({ summonerName: this.summonerName, region: this.region })
            .then(({ summonerId }) => {
              this.$router.push({ path: `/game-current/${summonerId}` });
            })
            .catch(({ message }) => {
              showModal(message);
            });
        }
      },

      handleOnChangeSearchType(value) {
        this.searchType = value;
      },
    },

    components: {
      AppNav,
      SummonerInput,
      ErrorView,
      LoadingView,
      ProBuildsList,
      LoadingIndicator,
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/colors';
  @import '../../assets/scss/mixins';

  .headerContainer {
    padding: .5em;
    background-color: $color-primary;
    background-image: url('/images/background_shapes.png');
    background-size: 330px;
    background-repeat: repeat;

    .iconContainer {
      width: 9em;
      position: relative;
      margin: 0 auto;

      .colosoIcon {
        width: 9em;
        height: 9em;
      }

      .alphaBadge {
        font-size: 0.9em;
        background: $color-accent;
        padding: 0.07em 0.75em;
        color: white;
        position: absolute;
        bottom: 0;
        right: -1.5em;
        font-weight: bold;
        border-radius: 0 0.6em 0 0.6em;
      }
    }

    .SearchControls {
      margin-bottom: 1em;
      margin-top: 2em;

      .formControls {
        display: flex;
        flex-direction: column;
        align-items: center;

        .SummonerInput {
          max-width: 34em;
        }

        .radiosContainer {
          padding-top: 1em;
          display: block;
          margin: 0 auto;
          color: white;

          .radioRow {
            display: inline-flex;
            height: 3em;
            margin: 0 1em;

            &:first-child {
              align-self: flex-end;
            }

            .radioButton {
              flex: 0;
              width: 1em;
              margin-right: 0.5em;
            }
          }
        }
      }
    }
  }

  .contentContainer {
    padding: 2em 0;

    .title {
      font-size: 1.4em;
    }
  }
</style>

<style lang="scss">

</style>

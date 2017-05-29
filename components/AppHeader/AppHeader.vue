<template lang="pug">
  header
    .container
      .mobileToolbar.hidden-md-up
        md-button.hamburguerButton(v-if='!menuIsOpen', @click.native='openMenu')
          md-icon
            | menu
        md-button.hamburguerButton(v-else='', @click.native='closeMenu')
          md-icon
            | close
        .title
          | Coloso
      .navMenu.hidden-sm-down(ref='navMenu')
        app-nav
        .u-flexer
        a.androidButton.hidden-sm-down(href='https://play.google.com/store/apps/details?id=com.pedronalbert.lolcena', target='_blank')
          md-icon android
        .searchForm(v-if='!renderHome')
          summoner-input(v-if='!fetching', :summoner='summoner', :region='region', @change-region='handleOnChangeRegion', @change-summoner='handleOnChangeSummoner', @submit='handleOnSubmitSearchProfile', @keyup.enter.native='handleOnSubmitSearchProfile', size='small')
          loading-indicator(v-else='', theme='white')
      .homeSearch(v-if='renderHome')
        .iconContainer
          img.icon(src='/static/images/coloso_icon.png', alt='Coloso')
          .alphaBadge
            | ßeta
        .SearchControls
          template(v-if='fetching')
            .h-100.d-flex.justify-content-center.align-items-center
              loading-indicator(theme='white')
          template(v-else='')
            form.formControls(@submit.prevent='handleOnSubmit')
              summoner-input(:summoner='summoner', :region='region', @change-summoner='handleOnChangeSummoner', @change-region='handleOnChangeRegion', @submit='handleOnSubmit')
              .radios-container
                md-radio(:value='searchType', @change='handleOnChangeSearchType', md-value='PROFILE', md-theme='white') {{ $t('summonerProfile') }}
                md-radio(:value='searchType', @change='handleOnChangeSearchType', md-value='GAME', md-theme='white') {{ $t('currentGame') }}
</template>

<script>
  import $ from 'jquery';
  import AppNav from './AppNav';
  import SummonerInput from '../SummonerInput';
  import LoadingIndicator from '../LoadingIndicator';

  export default {
    name: 'AppHeader',

    props: {
      summoner: String,
      region: String,
      fetching: Boolean,
      searchType: String,
      renderHome: {
        type: Boolean,
        default: false,
      },
    },

    data: () => ({
      menuIsOpen: false,
    }),

    methods: {
      handleOnChangeRegion(region) {
        this.$emit('change-region', region);
      },

      handleOnChangeSummoner(summoner) {
        this.$emit('change-summoner', summoner);
      },

      handleOnSubmit() {
        this.$emit('submit');
      },

      handleOnChangeSearchType(value) {
        this.$emit('change-search-type', value);
      },

      handleOnSubmitSearchProfile() {
        this.handleOnChangeSearchType('PROFILE');
        this.handleOnSubmit();
      },

      openMenu() {
        $(this.$refs.navMenu).removeClass('hidden-sm-down');
        this.menuIsOpen = true;
      },

      closeMenu() {
        $(this.$refs.navMenu).addClass('hidden-sm-down');
        this.menuIsOpen = false;
      },
    },

    components: {
      AppNav,
      SummonerInput,
      LoadingIndicator,
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../styles/colors';
  @import '../../styles/mixins';

  header {
    background-color: $color-primary;
    background-image: url('//static.coloso.net/images/background_shapes.png');
    background-size: 306px 256px;
    box-shadow: 0 1px 5px rgba(0,0,0,.2), 0 2px 2px rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12);

    .mobileToolbar {
      height: 3.5em;
      display: flex;
      align-items: center;
      color: white;

      .title {
        font-weight: bold;
        font-size: 1.2em;
      }

      .hamburguerButton {
        width: 3em;
        height: 3em;
        min-width: 3em;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 1rem;

        .md-icon { color: white }
      }
    }

    .navMenu {
      height: 4em;
      display: flex;
      align-items: center;

      @include media-breakpoint-down(sm) {
        height: auto;
        flex-direction: column;
        padding: 0 1em 1em 1em;
        align-items: flex-start;
      }

      .androidButton {
        margin-right: 1em;

        .md-icon {
          font-size: 1.8em;
          width: 1em;
          height: 1em;
          color: white;
        }
      }

      .searchForm {
        width: 20em;
        display: flex;
        justify-content: center;

        @include media-breakpoint-down(sm) {
          width: 100%;
          margin-top: 0.5em;
        }
      }

      .LoadingIndicator {
        margin-right: 5.5em !important;
      }
    }


    .iconContainer {
      width: 8em;
      margin: auto;
      position: relative;
      .icon {
        display: block;
        width: 8em;
        height: 8em;
        box-sizing: content-box;
        margin: 1em auto 2em auto;
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
      height: 5.5em;
      margin-bottom: 1em;

      @include media-breakpoint-down(xs) {
        height: 7em;
      }

      .SummonerInput {
        max-width: 34em;
      }

      .formControls {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        height: 100%;
      }

      .radios-container {
        width: 100%;
        color: white;
        margin-top: 1em;

        &>div {
          margin: 0 1em;
        }
      }
    }

  }
</style>

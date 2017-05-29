<template lang="pug">
  nav
    .container.h-100
      .d-flex.align-items-center.h-100
        button.hamburguerButton.hidden-md-up(@click='toggleMenu')
          icon(:name="menuIconName")
        .title.hidden-md-up Coloso
        .menuContainer(
          ref="menu"
          class="container d-md-flex align-items-center"
          :class="{ 'hidden-sm-down': !menuIsOpen }"
        )
          router-link.menuItem(to='/') {{ $t('home') }}
          router-link.menuItem(to='/pro-builds') {{ $t('proBuilds') }}
          .u-flexer
          a.mr-4.hidden-md-down(href="https://play.google.com/store/apps/details?id=com.pedronalbert.lolcena", taget="_blank")
            v-icon.androidIcon android
          template(v-if="renderForm")
            .loadingContainer.d-flex.justify-content-center(v-if="fetching")
              loading-indicator(theme="white")
            form.searchInputs.animated.fadeIn(v-else, @submit.prevent="$emit('submit')")
              summoner-input(
                :summoner="summonerName",
                :region="region",
                @submit="submit => $emit('submit')"
                @change-region="region => $emit('change-region', region)",
                @change-summoner="summoner => $emit('change-summoner', summoner)",
                size="small"
            )
</template>

<script>
  import Icon from './Icon.vue';
  import SummonerInput from './SummonerInput.vue';
  import LoadingIndicator from './LoadingIndicator.vue';

  export default {
    name: 'AppNav',

    data() {
      return { menuIsOpen: false };
    },

    props: ['summonerName', 'region', 'fetching', 'renderForm'],

    methods: {
      openMenu() {
        this.menuIsOpen = true;
      },

      closeMenu() {
        this.menuIsOpen = false;
      },

      toggleMenu() {
        if (this.menuIsOpen) {
          return this.closeMenu();
        }

        return this.openMenu();
      },

      handleOnChangeRegion(region) {
        this.$emit('change-region', region);
      },

      handleOnChangeSummoner(summoner) {
        this.$emit('change-summoner', summoner);
      },
    },

    computed: {
      menuIconName() {
        if (this.menuIsOpen) {
          return 'close';
        }

        return 'menu';
      },
    },

    components: {
      Icon,
      SummonerInput,
      LoadingIndicator,
    },
  };
</script>

<style lang="scss" scoped>
@import '../assets/scss/colors';
@import '../assets/scss/mixins';

nav {
  $navHeight: 4em;

  height: $navHeight;
  background-color: $color-primary;

  .hamburguerButton {
    border: none;
    width: 3em;
    height: 3em;
    margin-right: 1.5em;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;

    i {
      color: white;
    }
  }

  .title {
    color: white;
    font-weight: bold;
    font-size: 1.2em;
  }

  .menuContainer {
    height: 100%;
    background-color: inherit;

    @include media-breakpoint-down(sm) {
      position: absolute;
      left: 0;
      right: 0;
      top: $navHeight;
      height: auto;
      padding-right: 2em;
      padding-left: 2em;
      padding-bottom: 1.5em;
      background-color: #3aa8ff;
      z-index: 100;
    }

    .menuItem{
      margin-right: 2em;
      color: white;
      text-decoration: none;
      display: block;
      margin-top: 5px;
      padding-bottom: 5px;
      font-weight: bold;
      border-bottom: .2em solid transparent;
      transition: border .2s;

      &:hover {
        color: white !important;
      }

      &.nuxt-link-exact-active {
        border-bottom: 0.2em solid $color-accent;

        @include media-breakpoint-down(sm) {
          border-bottom: none;
        }
      }

      @include media-breakpoint-down(sm) {
        line-height: 2.75em;
        padding: 0;
        margin: .1em 0;
      }
    }

    .androidIcon {
      color: white;
      font-size: 1.5em;
    }
  }

  $form-size: 22em;

  .searchInputs {
    width: $form-size;

    @include media-breakpoint-down(sm) {
      padding-top: .75em;
      width: 100%;
    }
  }

  .loadingContainer {
    width: $form-size;
  }
}

</style>

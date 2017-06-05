<template lang="pug">
  .navContainer
    nav
      .container.h-100
        .d-flex.align-items-center.h-100
          button.hamburguerButton.hidden-md-up(@click='toggleMenu')
            v-icon {{ menuIconName }}
          .title.hidden-md-up Coloso
          .menuContainer(
            ref="menu"
            class="container d-md-flex align-items-center"
            :class="{ 'hidden-sm-down': !menuIsOpen }"
          )
            router-link.menuItem(@click.native="handleOnClickMenuItem", to='/') {{ $t('home') }}
            router-link.menuItem(@click.native="handleOnClickMenuItem", to='/pro-builds') {{ $t('proBuilds') }}
            .u-flexer
            a.styless.mr-4.hidden-md-down(href="https://play.google.com/store/apps/details?id=com.pedronalbert.lolcena", taget="_blank")
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

      handleOnClickMenuItem() {
        this.closeMenu();
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
      SummonerInput,
      LoadingIndicator,
    },
  };
</script>

<style lang="stylus" scoped>
  @require '../assets/stylus/colors'
  @require '../assets/stylus/mixins'

  navHeight = 4em

  .navContainer
    height: navHeight
    min-height: navHeight

  nav
    position: fixed
    top: 0
    left: 0
    right: 0
    z-index: 50
    height: navHeight
    background-color: colors.primary
    background-image: url('/images/background_shapes.png')
    background-size: 306px 256px

    .hamburguerButton
      border: none
      margin-right: 2.5em
      color: white
      display: flex
      justify-content: center
      align-items: center
      margin-bottom: 0

      i
        color: white
        font-size: 32px

    .title
      color: white
      font-weight: bold
      font-size: 1.2em

    .menuContainer
      height: 100%
      background-color: inherit

      +media-breakpoint-down(sm)
        position: absolute
        left: 0
        right: 0
        top: navHeight
        height: auto
        padding-right: 2em
        padding-left: 2em
        padding-bottom: 1.5em
        background-color: #3aa8ff
        z-index: 100

      .menuItem
        margin-right: 2em
        color: white
        text-decoration: none
        display: block
        margin-top: 5px
        padding-bottom: 5px
        font-weight: bold
        border-bottom: .2em solid transparent
        transition: border .2s

        &:hover
          color: white !important

        &.nuxt-link-exact-active
          border-bottom: 0.2em solid colors.accent

          +media-breakpoint-down(sm)
            border-bottom: none

        +media-breakpoint-down(sm)
          line-height: 2.75em
          padding: 0
          margin: .1em 0

      .androidIcon
        color: white
        font-size: 1.5em

    formSize = 22em

    .searchInputs
      width: formSize

      +media-breakpoint-down(sm)
        padding-top: .75em
        width: 100%

    .loadingContainer
      width: formSize
</style>

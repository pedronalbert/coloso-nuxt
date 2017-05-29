<template lang="pug">
  nav.d-flex.align-items-center.elevation-2
    .container
      button.hamburguerButton.hidden-sm-up(@click='toggleMenu')
        icon(:name="menuIconName")
      .title.hidden-sm-up Coloso
      .menuContainer(
        ref="menu"
        class="container d-md-flex align-items-center"
        :class="{ 'hidden-xs-down': !menuIsOpen }"
      )
        router-link.menuItem(to='/') {{ $t('home') }}
        router-link.menuItem(to='/pro-builds') {{ $t('proBuilds') }}
</template>

<script>
  import Icon from './Icon.vue';

  export default {
    name: 'AppNav',

    data() {
      return { menuIsOpen: false };
    },

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
    background: red;
    width: 3em;
    height: 3em;
    margin-right: 1.5em;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
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
      height: 10em;
      padding: 1em 2em;
    }

    .menuItem{
      margin-right: 2em;
      color: white;
      text-decoration: none;
      display: block;
      margin-top: 5px;
      padding-bottom: 5px;
      font-weight: bold;

      &:hover {
        color: white !important;
      }

      &.nuxt-link-exact-active {
        border-bottom: 0.2em solid $color-accent;

        @include media-breakpoint-down(sm) {
          border-bottom: none;
          font-weight: bold;
        }
      }

      @include media-breakpoint-down(sm) {
        line-height: 2.75em;
        padding: 0;
        margin: .1em 0;
      }
    }
  }

}
</style>

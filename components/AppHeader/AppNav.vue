<template lang="pug">
  nav.d-flex.AppNav
    .menu-item
      router-link(:to="{ name: 'HomeView' }") {{ $t('home') }}
    .menu-item
      router-link(:to="{ name: 'ProBuildsListView' }") {{ $t('proBuilds') }}
    .menu-item.hidden-md-up
      a(href='https://play.google.com/store/apps/details?id=com.pedronalbert.lolcena', target='_blank') Android
</template>

<script>
  export default {
    name: 'AppNav',
  };
</script>

<style lang="scss" scoped>
  @import '../../styles/colors';
  @import '../../styles/mixins';

  nav {

    @include media-breakpoint-down(sm) {
      flex-direction: column;
      width: 100%;
    }

    .menu-item {
      margin-right: 2em;

      a {
        text-decoration: none;
        display: block;
        margin-top: 5px;
        padding-bottom: 5px;
        color: white !important;

        &.router-link-exact-active {
          border-bottom: 0.2em solid $color-accent;
        }
      }

      @include media-breakpoint-down(sm) {
        a {
          line-height: 3.5em;
          padding: 0;
          margin: 0;

          &.active { border-bottom: 0 }
        }
      }
    }
  }
</style>

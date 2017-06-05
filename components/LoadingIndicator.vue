<template lang="pug">
  .d-flex.justify-content-center.align-items-center.LoadingIndicator
    sync-loader(:class='getTheme()', :size='size')
</template>

<script>
  import SyncLoader from 'vue-spinner/src/SyncLoader.vue';

  export default {
    name: 'LoadingIndicator',

    components: {
      SyncLoader,
    },

    props: {
      theme: {
        type: String,
        default: 'accent', // accent|white
      },

      size: {
        type: String,
        default: '12px',
      },
    },

    methods: {
      getTheme() {
        return `v-spinner-${this.theme}`;
      },
    },
  };
</script>

<style lang="stylus" scoped>
  .LoadingIndicator
    height: auto
    width: auto
    margin: 0.75em auto
</style>

<template lang="pug">
  .d-flex.justify-content-center.align-items-center.LoadingIndicator
    sync-loader(:class='getTheme()', :size='size')
</template>

<script>
  import SyncLoader from 'vue-spinner/src/SyncLoader.vue';

  export default {
    name: 'LoadingIndicator',

    props: {
      theme: {
        type: String,
        default: 'accent',
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

    components: {
      SyncLoader,
    },
  };
</script>

<style lang="scss" scoped>
  .LoadingIndicator {
    height: auto;
    width: auto;
    margin: 0.75em auto;
  }
</style>

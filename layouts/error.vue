<template lang="pug">
  .Error
    .wrapper
      .container
        error-view(:message="message", :retry-button="false", poro-name="shock")
</template>

<script>
  import ErrorView from '../components/ErrorView.vue';

  export default {
    name: 'Error',

    components: {
      ErrorView,
    },

    props: ['error'],

    computed: {
      message() {
        if (this.error.statusCode === 404) {
          return this.$t('pageNotFound');
        }

        return this.$t('somethingWrong');
      },
    },
  };
</script>

<style lang="stylus" scoped>
  .Error
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    display: flex
    align-items: center
    justify-content: center
</style>

<template lang="pug">
  .PreloadPage
    .wrapper
      .container
        .loadingContainer(v-if="fetching")
          loading-indicator(size="16px")
          .loadingText {{ $t('loadingData') }}
        error-view(v-else-if="fetchError", :message="message", :retryButton="retryButton", @retry="handleOnRetry")
</template>

<script>
  import LoadingIndicator from './LoadingIndicator.vue';
  import PoroSticker from './PoroSticker.vue';
  import ErrorView from './ErrorView.vue';

  export default {
    name: 'PreloadPage',

    components: {
      LoadingIndicator,
      PoroSticker,
      ErrorView,
    },

    props: {
      fetching: {
        type: Boolean,
        default: true,
      },

      fetchError: {
        type: Boolean,
        default: false,
      },

      message: {
        type: String,
      },

      retryButton: {
        type: Boolean,
        default: false,
      },
    },

    methods: {
      handleOnRetry() {
        this.$emit('retry');
      },
    },
  };
</script>

<style lang="stylus" scoped>
  .PreloadPage
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    display: flex
    justify-content: center
    align-items: center

    .loadingContainer
      .loadingText
        font-size: 1.2rem
        text-align: center
        margin-top: 2rem
        font-style: italic

    .errorContainer
      display: flex
      justify-content: center
</style>

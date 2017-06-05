<template lang="pug">
  .d-flex.flex-column.justify-content-center.align-items-center
    loading-indicator(size='14px')
    .mt-4
      i.message.text-primary
        | {{ loadingMessage }}...
</template>

<script>
  import LoadingIndicator from './LoadingIndicator.vue';

  export default {
    name: 'LoadingView',

    props: {
      message: {
        type: String,
      },
    },

    computed: {
      loadingMessage() {
        if (this.message) {
          return this.message;
        }

        return this.$t('loadingData');
      },
    },

    components: {
      LoadingIndicator,
    },
  };
</script>

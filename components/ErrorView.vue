<template lang="pug">
  .ErrorView.mx-auto.d-flex.justify-content-center.align-items-center
    .d-flex.flex-column.align-items-center
      poro-sticker(:name='poroName', :class='poroSize')
      .message.text-primary {{ message }}
      md-button.md-accent(v-if='retryButton', @click.native='handleOnClickRetry')
        | {{ $t('retry') }}
</template>

<script>
  import PoroSticker from './PoroSticker.vue';

  export default {
    name: 'ErrorView',

    props: {
      message: {
        type: String,
        default: 'Algo ha salido mal',
      },

      poroName: {
        type: String,
        default: 'sad',
      },

      poroSize: {
        type: String,
        default: null,
      },

      retryButton: {
        type: Boolean,
        default: true,
      },
    },

    methods: {
      handleOnClickRetry() {
        this.$emit('press-retry');
      },
    },

    components: {
      PoroSticker,
    },
  };
</script>

<style lang="scss" scoped>
  .ErrorView {
    .message {
      font-size: 0.9em;
      text-align: center;
      font-style: italic;
    }

    .PoroSticker {
      width: 8em;
      height: 8em;
    }
  }
</style>

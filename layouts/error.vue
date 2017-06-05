<template lang="pug">
  .Error
    .wrapper
      .container.d-flex.justify-content-center
          PoroSticker(:name="poroName")
          .codeAndMessage
            .code {{ code }}
            .message {{ message }}.
</template>

<script>
  import ErrorView from '../components/ErrorView.vue';
  import PoroSticker from '../components/PoroSticker.vue';

  export default {
    name: 'Error',

    components: {
      ErrorView,
      PoroSticker,
    },

    props: ['error'],

    computed: {
      message() {
        if (this.error.statusCode === 404) {
          return this.$t('errors.pageNotFound');
        }

        return this.error.message;
      },

      code() {
        if (this.error.statusCode !== null) {
          return this.error.statusCode;
        }

        return 'OMG!';
      },

      poroName() {
        if (this.error.statusCode === 404) {
          return 'question';
        }

        return 'shock';
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

    .PoroSticker
      font-size: 1.8em

    .codeAndMessage
      margin-left: .5em
      border-left: 1px solid rgba(0,0,0,0.2)
      padding-left: 1.5em
      justify-content: center
      display: flex
      flex-direction: column
      max-width: 40%

      .code
        font-size: 2.3em
        font-style: italic
        padding-bottom: .25em

      .message
        font-style: italic
</style>

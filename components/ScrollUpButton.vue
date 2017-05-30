<template lang="pug">
  transition(name='fade')
    v-btn.ScrollUpButton.accent(
      v-if='displayButton'
      @click.native='handleOnClickScrollUp'
      :floating="true", :large="true"
    )
      v-icon keyboard_arrow_up
</template>

<script>
  import $ from 'jquery';

  export default {
    name: 'ScrollUpButton',

    props: {
      distance: {
        type: Number,
        default: 300,
      },
    },

    data: () => ({
      displayButton: false,
    }),

    created() {
      if (process.BROWSER_BUILD) {
        window.addEventListener('scroll', this.handleOnScroll);
      }
    },

    methods: {
      handleOnScroll() {
        if (document.body.scrollTop > this.distance && !this.displayButton) {
          this.displayButton = true;
        } else if (document.body.scrollTop < this.distance && this.displayButton) {
          this.displayButton = false;
        }
      },

      handleOnClickScrollUp() {
        $('html, body').animate({
          scrollTop: 0,
        }, 600);
      },
    },

    beforeDestroy() {
      if (process.BROWSER_BUILD) {
        window.removeEventListener('scroll', this.handleOnScroll);
      }
    },
  };
</script>

<style lang="scss" scoped>
  .ScrollUpButton {
    position: fixed;
    bottom: 1em;
    right: 1.2em;
    z-index: 2;
    border-radius: 50%;

  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0
  }
</style>

<template lang="pug">
  .d-flex.align-items-center
    img.icon(src='//static.coloso.net/images/icons/gold.png')
    span.text-secondary {{ goldValue }}
</template>

<script>
  import { numeral } from '../filters';

  export default {
    name: 'Gold',

    props: {
      amount: {
        type: Number,
        defaul: 0,
      },

      abbr: {
        type: Boolean,
        default: false,
      },
    },

    computed: {
      goldValue() {
        if (this.abbr) {
          return numeral(this.amount, '0a');
        }

        return numeral(this.amount, '0,0');
      },
    },
  };
</script>

<style lang="stylus" scoped>
  .icon
    width: 1em
    margin-right: 0.25em
</style>

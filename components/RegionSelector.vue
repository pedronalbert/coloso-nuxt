<template lang="pug">
  v-select.RegionSelector(:value='itemSelected', @input="handleOnInput" :items="items")
</template>

<script>
  import { find } from 'lodash';

  export default {
    name: 'RegionSelector',

    props: ['region'],

    data() {
      return {
        items: [
          { text: 'NA' },
          { text: 'LAN' },
          { text: 'LAS' },
          { text: 'BR' },
          { text: 'EUW' },
          { text: 'EUNE' },
          { text: 'OCE' },
          { text: 'JP' },
          { text: 'KR' },
          { text: 'RU' },
          { text: 'TR' },
        ],
      };
    },

    computed: {
      itemSelected() {
        return find(this.items, { text: this.region }) || this.items[0];
      },
    },

    methods: {
      handleOnInput(regionItem) {
        this.$emit('input', regionItem.text);
      },
    },
  };
</script>

<style lang="scss" scoped>
</style>

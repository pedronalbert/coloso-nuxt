<template lang="pug">
  img.ItemImage(:src='imageUrl')
</template>

<script>
  import { isFinite } from 'lodash';

  export default {
    name: 'ItemImage',

    props: ['itemId'],

    computed: {
      imageUrl() {
        if (isFinite(this.itemId)) {
          return `//static.coloso.net/images/items/${this.itemId}.jpg`;
        }

        return '//static.coloso.net/images/items/0.jpg';
      },
    },
  };
</script>

<style lang="scss">
  .ItemImage {
    width: 2em;
    height: 2em;
    min-width: 2em;
    min-height: 2em;
  }
</style>

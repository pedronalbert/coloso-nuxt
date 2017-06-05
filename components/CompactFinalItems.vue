<template lang="pug">
  .CompactFinalItems
    .itemsContainer
      .itemsRow
        item-image.rounded(v-for='itemId, idx in itemsIds.slice(0, 3)', :item-id='itemId', :key='idx')
      .itemsRow
        item-image.rounded(v-for='itemId, idx in itemsIds.slice(3, 6)', :item-id='itemId', :key='idx')
    .trinketContainer
      div
        item-image.rounded(:item-id='itemsIds[6]')
</template>

<script>
  import ItemImage from './ItemImage.vue';

  export default {
    name: 'CompactFinalItems',

    props: ['itemsIds'],

    components: {
      ItemImage,
    },
  };
</script>

<style lang="stylus" scoped>
  .CompactFinalItems
    itemsSeparation = 0.15em

    display: flex

    .itemsRow
      .ItemImage
        margin-right: itemsSeparation
        margin-bottom: itemsSeparation

      &:last-child
        margin-bottom: 0

    .trinketContainer
      display: flex
      align-items: center
</style>

<template lang="pug">
  .FinalItems
    item-image.rounded(v-for='itemId, index in itemsIds', :key='index', :item-id='itemId')
</template>

<script>
  import ItemImage from './ItemImage.vue';

  export default {
    name: 'FinalItems',

    props: ['itemsIds'],

    components: { ItemImage },
  };
</script>

<style lang="stylus">
  .FinalItems
    height: 2em
    display: flex
    justify-content: space-around

    .ItemImage
      margin-right: 0.25em

      &:last-child
        margin-right: 0
</style>

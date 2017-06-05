<template lang="pug">
.ItemsTimelineEntry
  .d-flex
    .itemImageContainer(v-for='item in items')
      item-image.rounded(:item-id='item.itemId')
      .itemCount(v-if='item.count > 1') {{ item.count }}
      tooltip-card
        .itemName.text-primary {{ item.name }}
        gold(:amount='item.gold.total')
        .description.text-secondary
          | {{ item.plaintext }}
  .timestamp.text-lowercase {{ entryMinutes }}
</template>

<script>
  import { groupBy, map, assign } from 'lodash';
  import moment from 'moment';
  import { ItemImage, Gold, TooltipCard } from '../../components';

  export default {
    name: 'ItemsTimelineEntry',

    props: {
      entry: Object,
    },

    computed: {
      items() {
        const groupedItems = groupBy(this.entry.items, 'itemId');

        return map(groupedItems, items => assign(items[0], { count: items.length }));
      },

      entryMinutes() {
        const minutes = moment.duration(this.entry.timestamp).minutes();

        if (this.entry.items.length === 1) {
          return `${minutes} m`;
        }

        return `${minutes} ${this.$t('minutes')}`;
      },
    },

    components: {
      ItemImage,
      Gold,
      TooltipCard,
    },
  };
</script>

<style lang="stylus" scoped>
  @require '../../assets/stylus/colors'

  .ItemsTimelineEntry
    background-color: colors.primary
    border-radius: 0.25em
    padding: 0.25em
    margin-bottom: 1.25em
    position: relative

    .itemImageContainer
      width: 2.5em
      height: 2.5em
      margin-right: 0.25em
      position: relative

      .ItemImage
        width: 2.5em
        height: 2.5em

      &:last-child
        margin-right: 0em

      .itemCount
        width: 1.2em
        height: 1.2em
        background-color: black
        line-height: 1.2em
        text-align: center
        font-size: 0.8em
        position: absolute
        bottom: 0
        right: 0
        color: white

    .timestamp
      font-size: 0.7em
      line-height: 1.6em
      color: white
      position: absolute
      bottom: -1.4em
      left: 50%
      padding: 0 0.25em
      transform: translateX(-50%)
      background-color: #757575
      border-radius: 0.25em
      white-space: nowrap
</style>

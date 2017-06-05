<template lang="pug">
.d-flex.flex-wrap
  template(v-for='(entry, index) in timelineEntries')
    .d-flex.align-items-center
      items-timeline-entry(:entry='entry')
      .arrowIconContainer.text-secondary(v-if='index < timelineEntries.length - 1')
        v-icon keyboard_arrow_right
</template>

<script>
  import ItemsTimelineEntry from './ItemsTimelineEntry.vue';

  export default {
    name: 'ItemsOrder',

    props: ['items'],

    computed: {
      timelineEntries() {
        const TIMESTAMP_DIFF = 30000;
        const items = this.items;
        const itemsTimeline = [];

        for (let i = 0; i < items.length; i += 1) {
          const timestampEntry = {
            timestamp: null,
            items: [],
          };
          let timestampAc = items[i].timestamp;

          timestampEntry.items.push(items[i]);

          for (let j = i + 1; j < items.length; j += 1) {
            if ((items[j].timestamp - items[i].timestamp) < TIMESTAMP_DIFF) {
              timestampEntry.items.push(items[j]);
              timestampAc += items[j].timestamp;
              i = j;
            } else {
              break;
            }
          }

          timestampEntry.timestamp = timestampAc / timestampEntry.items.length;
          itemsTimeline.push(timestampEntry);
        }

        return itemsTimeline;
      },
    },

    components: {
      ItemsTimelineEntry,
    },
  };
</script>

<style lang="stylus" scoped>
  .arrowIconContainer
    margin-top: -1em
</style>

<template lang="pug">
.SkillTimeline
  .timeline
    template(v-for='timelineEntry in timeline')
      .conector
      .conector(v-if='timelineEntry === null')
      skill-timeline-levelup(:timeline-entry='timelineEntry', v-else='')
</template>

<script>
  import SkillTimelineLevelup from './SkillTimelineLevelup.vue';

  export default {
    name: 'SkillTimeline',

    props: ['timeline'],

    components: {
      SkillTimelineLevelup,
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/colors';

  .SkillTimeline {
    display: flex;
    height: 3em;

    .timeline {
      display: flex;
      align-items: center;

      .conector {
        background-color: $color-primary;
        height: 6px;
        width: 1.8em;
        margin: 0 -0.01em
      }
    }
  }
</style>

<template lang="pug">
.SkillTimelineLevelup
  v-icon.addIcon add
  .timeline-tooltip
    .inner
      | {{ tooltipText }}
</template>

<script>
  export default {
    name: 'SkillTimelineLevelup',

    props: ['timelineEntry'],

    computed: {
      tooltipText() {
        if (this.timelineEntry.levelUpType === 'NORMAL') {
          return `${this.$t('level')} ${this.timelineEntry.championLevel}`;
        }

        return 'Especial';
      },
    },
  };
</script>

<style lang="stylus" scoped>
  @require '../../assets/stylus/colors'

  .SkillTimelineLevelup
    width: 1.8em
    height: 1.8em
    background-color: colors.accent
    border-radius: 50%
    border: 4px solid colors.primary
    position: relative
    color: white

    .addIcon
      display: block
      text-align: center
      font-size: 1.3em
      line-height: 1.1em
      width: 1em
      min-width: 1em
      height: 1em
      min-height: 1em
      color: white
      margin: 0 auto

    .timeline-tooltip
      bgColor = rgba(0,0,0,0.40)

      position: absolute
      font-size: 0.7em
      background-color: bgColor
      border-radius: 0.25em
      white-space: nowrap
      min-width: 5em
      text-align: center
      left: 50%
      bottom: 70%
      transform: translateX(-50%) translateY(-100%)

      .inner
        position: relative

        &::before
          content: ""
          position: absolute
          width: 0
          height: 0
          transform: translateX(-50%)
          left: 50%
          top: 100%
          border-left: 6px solid transparent
          border-right: 6px solid transparent
          border-top: 5px solid bgColor

</style>

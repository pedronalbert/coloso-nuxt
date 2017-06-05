<template lang="pug">
  .RunePage
    template(v-if="runes.length > 0")
      .runeRow(v-for='rune in runes')
        .imageContainer
          rune-image(:image-name='rune.image.full')
          .count {{ rune.rank || rune.count }}
        .runeInfo
          .text-primary {{ rune.name }}
          .text-secondary {{ rune.description }}
    .emptyText.text-secondary(v-else) {{ $t('runesEmpty') }}
</template>

<script>
  import RuneImage from './RuneImage.vue';

  export default {
    name: 'RunePage',

    props: ['runes'],

    components: {
      RuneImage,
    },
  };
</script>

<style lang="stylus">
  .RunePage
    font-size: 0.8em

    .runeRow
      display: flex
      padding: 0.5em
      border-bottom: 1px solid rgba(0,0,0,0.2)

      &:last-child
        border-bottom: none

      .imageContainer
        width: 4em
        height: 4em
        position: relative
        margin-right: 1em

        .count
          background-color: black
          color: white
          width: 1.2em
          height: 1.2em
          line-height: 1.2em
          text-align: center
          border-radius: 50%
          position: absolute
          bottom: 0
          right: 0

      .runeInfo
        display: flex
        flex-direction: column
        justify-content: center
        flex: 1

    .emptyText
      font-size: 1.2em
      font-style: italic
</style>

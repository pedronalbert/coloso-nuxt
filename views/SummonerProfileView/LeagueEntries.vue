<template lang="pug">
  .LeagueEntries
    .EntryContainer(v-for='entry in entries')
      .queue.text-primary.text-center
        b {{ entryType(entry) }}
      .d-flex
        .tierImageContainer.d-flex.justify-content-center.align-items-center
          ranked-tier-image(:tier='entry.tier')
        .dataContainer
          .d-sm-flex.d-md-block.d-lg-flex.justify-content-around
            .text-primary
              span {{ $t('league') }}:
              span.textTier.ml-1(:class='getTextTierClass(entry)') {{ entry.tier }}
            .text-primary
              | {{ $t('division') }}:
              b.ml-1 {{ entry.entries[0].division }}
          .d-sm-flex.d-md-block.d-lg-flex.justify-content-around
            .text-primary
              | {{ $t('victories') }}:
              span.victories.ml-1 {{ entry.entries[0].wins }}
            .text-primary
              | {{ $t('defeats') }}:
              span.defeats.ml-1 {{ entry.entries[0].losses }}
          .progressRow(v-if='entry.entries[0].miniSeries')
            | {{ $t('progress') }}:
            ranked-miniseries(style='flex: 1', :progress='entry.entries[0].miniSeries.progress')
          .text-sm-center.text-md-left.text-lg-center
            | {{ $t('leaguePoints') }}:
            b.ml-1 {{ entry.entries[0].leaguePoints }}
    .noEntries(v-if='entries.length === 0')
      poro-sticker.d-block.mx-auto(name='question')
      .text-secondary.mt-2
        | {{ $t('noEnoughGamesForLeague') }}.
</template>

<script>
  import { RankedTierImage, RankedMiniseries, PoroSticker } from '../../components';
  import { subTypeToQueueId } from '../../utils';

  export default {
    name: 'LeagueEntries',

    props: ['entries'],

    methods: {
      getTextTierClass(entry) {
        return `text-tier-${entry.tier.toLowerCase()}`;
      },

      entryType(entry) {
        const queueId = subTypeToQueueId(entry.queue);

        return this.$t(`queuesIds.${queueId}`);
      },
    },

    components: {
      RankedTierImage,
      RankedMiniseries,
      PoroSticker,
    },
  };
</script>

<style lang="stylus" scoped>
  @require '../../assets/stylus/colors'
  @require '../../assets/stylus/mixins'

  .EntryContainer
    border-bottom: 1px solid rgba(0,0,0,0.15)
    padding: 0.8em 0

    &:first-child
      padding-top: 0
    &:last-child
      border-bottom: none
      padding-bottom: 0

    .queue
      font-size: 0.9em
      margin-bottom: 0.5em

    .RankedTierImage

      +media-breakpoint-only(sm)
        font-size: 1em
        margin-left: 1.25em

      +media-breakpoint-only(lg)
        font-size: 0.8em

    .dataContainer
      margin-left: 0.5em
      font-size: 0.8em
      flex: 1

      +media-breakpoint-down(md)
        margin-left: 1em

      +media-breakpoint-down(lg)
        font-size: 0.75em

      .textTier
        text-transform: uppercase
        font-weight: bold

      .victories
        font-size: 1.2em
        color: colors.victory
        font-weight: bold

      .defeats
        font-size: 1.2em
        font-weight: bold
        color: colors.defeat

      .progressRow
        display: flex
        justify-content: center

        +media-breakpoint-down(xs)
          justify-content: flex-start

        .RankedMiniseries
          max-width: 8.5em

  .noEntries
    font-size: 0.9em
</style>

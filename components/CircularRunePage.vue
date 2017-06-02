<template lang="pug">
  .CircularRunePage
    .bigCircle
      .smallCircle
      .summaryBox
        .row.no-gutters
          .col-12.mb-2.text-center
            b {{ $t('stats') }}
        .row.no-gutters.mt-2(v-for='stat in summaryStats')
          .col-3 {{ stat.amount }}
          .col-9 {{ stat.type | sentenceCase }}
      template(v-for='runes, type in runesSlots')
        div(v-for='rune, index in runes', :style='getRuneStyle(type, index)')
          rune-image(:image-name='rune.image.full')
          tooltip-card(v-if="rune.name !== null")
            .text-primary {{ rune.name }}
            .text-secondary {{ rune.description }}
</template>

<script>
  import { groupBy, each, omit, isInteger } from 'lodash';
  import { getRuneStat } from '../utils';
  import RuneImage from './RuneImage.vue';
  import TooltipCard from './TooltipCard.vue';

  const BIG_CIRCLE_RAD = 15;
  const SMALL_CIRCLE_RAD = 11;
  const BASIC_RUNE_SIZE = 3.8;
  const BLACK_RUNE_SIZE = 5;

  function cos(ancle) {
    return Math.cos(ancle * (Math.PI / 180));
  }

  function sin(ancle) {
    return Math.sin(ancle * (Math.PI / 180));
  }

  function calculatePositionStyle(rad, size, ancle) {
    return {
      width: `${size}em`,
      height: `${size}em`,
      transform: `translate(-${size / 2}em, -${size / 2}em)`,
      left: `${BIG_CIRCLE_RAD + (rad * cos(ancle))}em`,
      top: `${BIG_CIRCLE_RAD + ((rad * sin(ancle)) * -1)}em`,
      position: 'absolute',
    };
  }

  function fillWithEmptyRunes(array, amount) {
    for (let i = 0; i < amount; i += 1) {
      array.push({
        name: null,
        image: {
          full: 'empty.png',
        },
      });
    }

    return array;
  }

  export default {
    name: 'CircularRunePage',

    props: ['runes'],

    methods: {
      getRuneStyle(type, index) {
        let runesMargin = 10;
        let runeSize = BASIC_RUNE_SIZE;
        const slotsInitialDeg = {
          red: 160,
          blue: -80,
          yellow: 40,
          black: 150,
        };

        if (type === 'black') {
          runesMargin = 120;
          runeSize = BLACK_RUNE_SIZE;
        }

        const degrees = slotsInitialDeg[type] + ((index + 1) * runesMargin);
        let positionalCircleRad;

        if (type === 'black') {
          positionalCircleRad = (BIG_CIRCLE_RAD + SMALL_CIRCLE_RAD) / 2;
        } else if (index % 2 === 0) {
          positionalCircleRad = BIG_CIRCLE_RAD;
        } else {
          positionalCircleRad = SMALL_CIRCLE_RAD;
        }

        return calculatePositionStyle(positionalCircleRad, runeSize, degrees);
      },
    },

    computed: {
      runesSlots() {
        const slots = {
          red: [],
          yellow: [],
          blue: [],
          black: [],
        };

        const grouped = groupBy(this.runes, rune => rune.rune.type);

        each(grouped, (runes, groupName) => {
          each(runes, (rune) => {
            const count = rune.rank || rune.count;

            for (let i = 0; i < count; i += 1) {
              slots[groupName].push(omit(rune, ['rank', 'count']));
            }
          });
        });

        slots.red = fillWithEmptyRunes(slots.red, 9 - slots.red.length);
        slots.yellow = fillWithEmptyRunes(slots.yellow, 9 - slots.yellow.length);
        slots.blue = fillWithEmptyRunes(slots.blue, 9 - slots.blue.length);
        slots.black = fillWithEmptyRunes(slots.black, 3 - slots.black.length);

        return slots;
      },

      summaryStats() {
        const summary = [];

        this.runes.forEach((rune) => {
          const stat = getRuneStat(rune.description);
          let amount = stat.amount * (rune.rank || rune.count);

          if (!isInteger(amount)) {
            amount = amount.toFixed(2);
          }

          summary.push({
            type: stat.type,
            amount,
          });
        });

        return summary;
      },
    },

    components: {
      RuneImage,
      TooltipCard,
    },
  };
</script>

<style lang="scss" scoped>
  @import '../assets/scss/colors';
  $big-circle-rad: 15em;
  $small-circle-rad: 11em;

  .CircularRunePage {
    margin: 1em;

    .summaryBox {
      width: 13em;
      height: $big-circle-rad - .9em;
      position: absolute;
      left: 8.9em;
      top: 7.5em;
      overflow-y: auto;

      & > div {
        font-size: 0.8em;
      }
    }

    .bigCircle {
      width: $big-circle-rad * 2;
      height: $big-circle-rad * 2;
      position: relative;
      border: 0.20em solid $color-primary;
      border-radius: 50%;
      box-sizing: content-box;

      .runeInner {
        position: relative;
      }

      .smallCircle {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: $small-circle-rad * 2;
        height: $small-circle-rad * 2;
        border: 0.20em solid $color-primary;
        border-radius: 50%;

      }
    }
  }
</style>

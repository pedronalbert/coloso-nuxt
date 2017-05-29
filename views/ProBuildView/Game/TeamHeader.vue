<template lang="pug">
  .TeamHeader
    .block.teamName {{ teamName }}
    .block(:class="win ? 'victory': 'defeat'") {{ winState }}
    .block
      score(:kills='kills', :deaths='deaths', :assists='assists')
</template>

<script>
  import { Score } from '../../../components';

  export default {
    name: 'TeamHeader',

    props: {
      teamId: {
        type: Number,
        default: 100,
      },

      win: {
        type: Boolean,
        default: true,
      },

      kills: {
        type: Number,
        default: 0,
      },

      deaths: {
        type: Number,
        default: 0,
      },

      assists: {
        type: Number,
        default: 0,
      },
    },

    computed: {
      teamName() {
        if (this.teamId === 100) {
          return this.$t('blueTeam');
        }

        return this.$t('redTeam');
      },

      winState() {
        if (this.win) {
          return this.$t('victory');
        }

        return this.$t('defeat');
      },
    },

    components: {
      Score,
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../../assets/scss/colors';
  @import '../../../assets/scss/mixins';

  .TeamHeader {
    display: flex;
    color: white;
    font-size: 0.9em;

    @include media-breakpoint-down(sm) {
      flex-direction: column;
    }

    .block {
      padding: 0.25em 1em;
      background: #EEEEEE;
    }

    .teamName {
      background-color: $color-primary;
    }

    .victory {
      background-color: $color-victory;
    }

    .defeat {
      background-color: $color-defeat;
    }
  }
</style>

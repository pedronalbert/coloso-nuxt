<template lang="pug">
  .SummonerInput(:class='size')
    region-selector(:region='region', @input='handleOnChangeRegion')
    .vertical-separator
    .summoner-input-container
      input.summoner-input(@input='handleOnChangeSummoner', :value='summoner', type='text', :placeholder="$t('summonerName')")
    v-btn.searchButton(primary @click.native='handleOnSubmit')
      | {{ $t('search') }}
    .searchIconButton(@click='handleOnSubmit')
      v-icon search
</template>

<script>
  import RegionSelector from './RegionSelector.vue';

  export default {
    name: 'SummonerInput',

    props: {
      region: String,
      summoner: String,
      size: {
        type: String,
        default: 'big',
      },
    },

    methods: {
      handleOnChangeRegion(newValue) {
        this.$emit('change-region', newValue);
      },

      handleOnChangeSummoner(event) {
        this.$emit('change-summoner', event.target.value);
      },

      handleOnSubmit() {
        this.$emit('submit');
      },
    },

    components: {
      RegionSelector,
    },
  };
</script>

<style lang="scss" scoped>
  @import '../assets/scss/colors';
  @import '../assets/scss/mixins';

  .SummonerInput {
    background-color: white;
    display: flex;
    align-items: center;
    border-radius: 0.3em;
    width: 100%;
    height: 2.5em;
    padding-left: .75em;

    .RegionSelector {
      flex: 0;
      width: 6em;
      margin-top: 2.5em; // Centrar debido a margin del vendor
      min-width: 6em;

      @include media-breakpoint-down(xs) {
        width: 5.5em;
        min-width: 5.5em;
      }
    }

    .searchButton {
      color: white;
    }

    .vertical-separator {
      background-color: rgba(0,0,0,0.2);
      width: 0.1em;
      height: 90%;
      margin-left: 1em;

      @include media-breakpoint-down(xs) {
        display: none;
      }
    }

    .summoner-input-container {
      padding: 0 1em;
      font-size: 1.2em;
      flex: 1;

      .summoner-input {
        width: 100%;
        color: rgba(0,0,0,0.7);
        border: none;
        margin: none;
        padding: none;

        &:focus { outline: none; }
      }
    }

    .searchIconButton {
      cursor: pointer;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 0.5em;
      background-color: $color-accent;
      border-radius: 0.3em;

      i { color: white !important }
    }
  }

  .SummonerInput.small {
    font-size: 0.8em;

    .RegionSelector {
      margin-top: 2.9em;
      margin-left: .25em;
    }

    .searchButton {
      display: none;
    }
  }

  .SummonerInput.big {
    .searchIconButton {
      display: none;
    }

    @include media-breakpoint-down(xs) {
      .searchIconButton,
      .searchButton {
        display: none;
      }
    }
  }
</style>

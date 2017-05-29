<template lang="pug">
  .SummonerData
    .imageContainer
      profile-icon-image(:profile-icon-id='summoner.profileIconId')
    .dataContainer
      .summonerName.text-primary {{ summoner.name }}
      .level.text-secondary {{ $t('level') }} {{ summoner.summonerLevel }}
      .region.text-secondary {{ region }}
</template>

<script>
  import { ProfileIconImage } from '../../components';

  export default {
    name: 'SummonerData',

    props: ['summoner'],

    computed: {
      region() {
        return this.$t(`regionsAbbrs.${this.summoner.region.toUpperCase()}`);
      },
    },

    components: {
      ProfileIconImage,
    },
  };
</script>

<style lang="scss">
  @import '../../assets/scss/colors';

  .SummonerData {
    display: flex;
    align-items: center;

    .ProfileIconImage {
      border-radius: 50%;
      font-size: 0.9em;
      border: 0.25em solid $color-primary;
    }

    .dataContainer {
      margin-left: 1.5em;
      font-size: 0.9em;

      .summonerName {
        font-size: 1.2em;
        font-weight: bold;
        margin-bottom: 0.1em;
      }

      .level {
        margin-bottom: 0.1em;
      }
    }
  }
</style>

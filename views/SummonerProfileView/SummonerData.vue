<template lang="pug">
  .SummonerData
    .imageContainer
      profile-icon-image(:profile-icon-id='summoner.profileIconId')
    .dataContainer
      .summonerName.text-primary {{ summoner.name }}
      .level.text-secondary {{ $t('level') }} {{ summoner.summonerLevel }}
      .region.text-secondary {{ region }}
    .playingButton.d-flex.align-items-center(v-if="playing", @click="handleOnClickCurrentGame")
      v-icon.mr-1.playingIcon fiber_manual_record
      .text-secondary {{ $t('playing') }}
</template>

<script>
  import { ProfileIconImage } from '../../components';

  export default {
    name: 'SummonerData',

    props: ['summoner', 'playing'],

    methods: {
      handleOnClickCurrentGame() {
        this.$emit('click-game-current');
      },
    },

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

<style lang="stylus">
  @require '../../assets/stylus/colors'

  .SummonerData
    display: flex
    align-items: center

    .ProfileIconImage
      border-radius: 50%
      font-size: 0.9em
      border: 0.25em solid colors.primary

    .dataContainer
      margin-left: 1.5em
      font-size: 0.9em

      .summonerName
        font-size: 1.2em
        font-weight: bold
        margin-bottom: 0.1em

      .level
        margin-bottom: 0.1em

    .playingButton
      position: absolute
      top: .5em
      right: .5em
      font-size: 0.8em
      border: 1px solid rgba(0,0,0,0.2)
      border-radius: .25em
      padding: .2em
      cursor: pointer

      .playingIcon
        color: rgba(0,0,0,0.3)
        font-size: 1.2em
        animation: playingIcon 3s infinite

  @keyframes playingIcon
    20%
      color: colors.defeat
    40%
      color: rgba(0,0,0,0.3)

</style>

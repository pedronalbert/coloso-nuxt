<template lang="pug">
  .ChampionAndSpells
    img.championImage(:src='championImageUrl')
    .spellsCol
      img.spellImage(:src='spell1ImageUrl')
      img.spellImage(:src='spell2ImageUrl')
</template>

<script>
  export default {
    name: 'ChampionAndSpells',

    props: ['championId', 'spell1Id', 'spell2Id'],

    data() {
      return {};
    },

    computed: {
      championImageUrl() {
        return `//static.coloso.net/images/champions_square/${this.championId}.jpg`;
      },

      spell1ImageUrl() {
        return `//static.coloso.net/images/summoner_spells/${this.spell1Id}.jpg`;
      },

      spell2ImageUrl() {
        return `//static.coloso.net/images/summoner_spells/${this.spell2Id}.jpg`;
      },
    },
  };
</script>

<style lang="stylus" scoped>
  @require '../assets/stylus/colors'

  .ChampionAndSpells
    size = 4em

    display: flex

    .championImage
      width: size
      height: size
      min-width: size
      min-height: size
      border: 3px solid colors.primary
      border-radius: 50%

    .spellsCol
      margin-left: -0.5em
      width: (size / 2)

      .spellImage
        width: size / 2
        height: size / 2
        min-width: size / 2
        min-height: size / 2
        border-radius: 50%
        border: 3px solid colors.primary
</style>

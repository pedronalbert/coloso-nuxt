<template lang="pug">
  .ChampionAvatar
    img.championImage(:src='championImageUrl')
    template(v-if='spell1Id > 0')
      .spells-col
        img.spell-image(:src='spell1ImageUrl')
        img.spell-image(:src='spell2ImageUrl')
    template(v-if='name')
      .dataContainer
        .champion-name.text-primary {{ name }}
        .champion-title.text-secondary {{ title | sentenceCase }}
</template>

<script>
  export default {
    name: 'ChampionAvatar',

    props: ['championId', 'name', 'title', 'spell1Id', 'spell2Id'],

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

<style lang="stylus">
  @require '../assets/stylus/colors'

  .ChampionAvatar
    size = 4em

    display: flex

    .championImage
      width: size
      height: size
      min-width: size
      min-height: size
      border: 3px solid colors.primary
      border-radius: 50%

    .spells-col
      margin-left: -0.5em
      width: (size / 2)
      display: flex
      flex-direction: column

      .spell-image
        width: (size / 2)
        height: (size / 2)
        border-radius: 50%
        border: 3px solid colors.primary

    .dataContainer
      flex: 1
      display: flex
      justify-content: center
      flex-direction: column
      overflow: hidden
      margin-left: 0.5em

      .champion-title
      .champion-name
        white-space: nowrap
        text-overflow: ellipsis
        overflow: hidden
        font-size: 1em

      .champion-title
        font-size: 0.8em
</style>

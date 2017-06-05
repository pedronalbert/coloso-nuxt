<template lang="pug">
  img.ChampionImage(:src='imageUrl')
</template>

<script>
  export default {
    name: 'ChampionImage',

    props: ['championId'],

    computed: {
      imageUrl() {
        return `//static.coloso.net/images/champions_square/${this.championId}.jpg`;
      },
    },
  };
</script>

<style lang="stylus">
  .ChampionImage
    width: 4em
    height: 4em
</style>

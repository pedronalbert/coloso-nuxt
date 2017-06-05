<template lang="pug">
  img.RankedTierImage(:src='imageUrl')
</template>

<script>
  export default {
    name: 'RankedTierImage',

    props: ['tier'],

    computed: {
      imageUrl() {
        return `//static.coloso.net/images/ranked_tiers/${this.tier.toLowerCase()}.png`;
      },
    },
  };
</script>

<style lang="stylus">
  .RankedTierImage
    width: 5em
    height: 5em
</style>

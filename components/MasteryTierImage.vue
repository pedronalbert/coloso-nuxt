<template lang="pug">
  img.MasteryTierImage(:src='imageUrl')
</template>

<script>
  export default {
    name: 'MasteryTierImage',

    props: ['level'],

    computed: {
      imageUrl() {
        return `//static.coloso.net/images/masteries_tiers/tier_${this.level}.png`;
      },
    },
  };
</script>

<style lang="scss">
  .MasteryTierImage {
    width: 2em;
    height: 2em;
  }
</style>

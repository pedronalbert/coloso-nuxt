<template lang="pug">
  img.ProfileIconImage(:src='imageUrl')
</template>

<script>
  export default {
    name: 'ProfileIconImage',

    props: ['profileIconId'],

    computed: {
      imageUrl() {
        return `//static.coloso.net/images/profileicons/${this.profileIconId}.jpg`;
      },
    },
  };
</script>

<style lang="stylus">
  .ProfileIconImage
    width: 5em
    height: 5em
    min-width: 5em
    min-height: 5em
</style>

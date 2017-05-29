<template lang="pug">
  img.RuneImage(:src='imageUrl')
</template>

<script>
  export default {
    name: 'RuneImage',

    props: ['imageName'],

    computed: {
      imageUrl() {
        return `//static.coloso.net/images/runes/${this.imageName}`;
      },
    },
  };
</script>

<style lang="scss">
  .RuneImage {
    width: 100%;
  }
</style>

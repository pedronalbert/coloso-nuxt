<template lang="pug">
  img.PoroSticker(:src='imageUrl', alt='Poro Sticker')
</template>

<script>
  export default {
    name: 'PoroSticker',

    props: ['name'],

    computed: {
      imageUrl() {
        return `/images/stickers/poro-${this.name}.png`;
      },
    },
  };
</script>

<style lang="stylus" scoped>
  .PoroSticker
    width: 5em
    height: 5em
</style>

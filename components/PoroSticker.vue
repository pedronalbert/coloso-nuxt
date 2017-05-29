<template lang="pug">
  img.PoroSticker(:src='imageUrl', alt='Poro Sticker')
</template>

<script>
  export default {
    name: 'PoroSticker',

    props: ['name'],

    computed: {
      imageUrl() {
        return `../assets/images/stickers/poro-${this.name}.png`;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .PoroSticker {
    width: 5em;
    height: 5em;
  }
</style>

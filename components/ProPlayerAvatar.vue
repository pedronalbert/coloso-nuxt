<template lang="pug">
  .ProPlayerAvatar
    img.image(:src='imageUrl')
    img.roleImage(:src='roleImageUrl')
</template>

<script>
  export default {
    name: 'ProPlayerAvatar',

    props: ['imageUrl', 'role'],

    computed: {
      roleImageUrl() {
        return `//static.coloso.net/images/roles/${this.role}.png`;
      },
    },
  };
</script>

<style lang="scss">
  @import '../assets/scss/colors';

  .ProPlayerAvatar {
    $size: 4em;
    position: relative;
    width: $size;
    height: $size;

    &-lg {
      font-size: 1.5em;
    }

    .image {
      width: $size;
      height: $size;
      min-width: $size;
      min-height: $size;
      border-radius: 50%;
      border: 3px solid $color-primary;
    }

    .roleImage {
      width: 1.25em;
      height: 1.25em;
      padding: 0.15em;
      position: absolute;
      bottom: 0;
      right: 0;
      background-color: black;
      border-radius: 50%;
      border: 2px solid $color-primary;
    }
  }
</style>

<template lang="pug">
  button.load-more-button.text-uppercase
    | {{ $t('loadMore') }}
</template>

<script>
  export default {
    name: 'LoadMoreButton',
  };
</script>

<style lang="scss" scoped>
  @import '../assets/scss/colors';
  @import '../assets/scss/mixins';

  .load-more-button {
    height: 36px;
    width: 100%;
    background-color: white;
    border-radius: 3px;
    border: 1.5px solid $color-accent;
    color: $color-accent;
    font-weight: bold;
    cursor: pointer;

    &:active { @include active-shadow() }
  }
</style>

<template lang="pug">
  .autocomplete-row(@click='handleOnClick')
    img.avatar(:src='imageUrl')
    .name.text-primary
      | {{ name }}
</template>

<script>
  export default {
    name: 'AutocompleteRow',

    props: ['name', 'imageUrl', 'value'],

    methods: {
      handleOnClick() {
        this.$emit('click', this.value);
      },
    },
  };
</script>

<style lang="stylus" scoped>
  .autocomplete-row
    padding: 8px 16px
    cursor: pointer
    border-bottom: 1px solid #EEEEEE

    .avatar
      width: 40px
      height: 40px
      border-radius: 50%
      margin-right: 12px

    .name
      font-size: 14px
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis

    &:hover
      background-color: #EEEEEE
</style>

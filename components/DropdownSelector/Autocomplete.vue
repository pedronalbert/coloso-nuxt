<template lang="pug">
  .autocomplete.elevation-2
    autocomplete-row.autocomplete-row.d-flex.align-items-center(v-for='option in options', :key='option.value', :name='option.name', :image-url='option.imageUrl', :value='option.value', @click='handleOnClickRow')
</template>

<script>
  import AutocompleteRow from './AutocompleteRow.vue';

  export default {
    name: 'Autocomplete',

    props: {
      options: {
        type: Array,
      },
    },

    methods: {
      handleOnClickRow(value) {
        this.$emit('click-row', value);
      },
    },

    components: {
      AutocompleteRow,
    },
  };
</script>

<style lang="stylus" scoped>
  .autocomplete
    overflow-y: scroll;
</style>

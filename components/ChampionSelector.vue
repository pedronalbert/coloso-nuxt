<template lang="pug">
  dropdown-selector(placeholder='Campeon', :options='options', :value='value', @input='handleOnInput')
</template>

<script>
  import DropdownSelector from './DropdownSelector';
  import championsArray from '../utils/champions';

  const champions = championsArray.map(championData => ({
    ...championData,
    imageUrl: `//static.coloso.net/images/champions_square/${championData.value}.jpg`,
  }));

  export default {
    name: 'ChampionSelector',

    props: ['value'],

    data() {
      return {
        options: champions,
      };
    },

    methods: {
      handleOnInput(value) {
        this.$emit('input', value);
      },
    },

    components: {
      DropdownSelector,
    },
  };
</script>

<style lang="scss" scoped>
</style>

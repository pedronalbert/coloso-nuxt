<template lang="pug">
  dropdown-selector(placeholder='Jugador', :options='proPlayersParsed', :value='value', @input='handleOnInput')
</template>

<script>
  import DropdownSelector from './DropdownSelector';

  export default {
    name: 'ProPlayerSelector',

    props: {
      value: {
        type: String,
        default: null,
      },

      players: {
        type: Array,
        default: () => [],
      },
    },

    methods: {
      handleOnInput(value) {
        this.$emit('input', value);
      },
    },

    computed: {
      proPlayersParsed() {
        return this.players.map(({ id, name, imageUrl }) => ({
          value: id,
          name,
          imageUrl,
        }));
      },
    },

    components: {
      DropdownSelector,
    },
  };
</script>

<style lang="scss" scoped>
</style>

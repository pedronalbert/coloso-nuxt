<template lang="pug">
  .pro-builds-list
    pro-builds-list-row(v-for='build in builds', :build='build', :key='build.id', @click='handleOnClickRow')
</template>

<script>
  import ProBuildsListRow from './ProBuildsListRow.vue';

  export default {
    name: 'ProBuildList',

    props: {
      builds: {
        default: [],
      },
    },

    methods: {
      handleOnClickRow(id) {
        this.$emit('click-row', id);
      },
    },

    components: {
      ProBuildsListRow,
    },
  };
</script>

<style lang="scss" scoped>
</style>

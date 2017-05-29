<template lang="pug">
  mastery-page(:masteries='masteries')
</template>

<script>
  import { MasteryPage } from '../../components';

  export default {
    name: 'MasteriesTab',

    props: ['masteries'],

    components: {
      MasteryPage,
    },
  };
</script>

<style lang="scss" scoped>
</style>

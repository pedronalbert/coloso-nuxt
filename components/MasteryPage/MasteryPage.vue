<template lang="pug">
  .d-flex.flex-wrap.justify-content-around
    mastery-tree(name='resolve', :masteries='masteries')
    mastery-tree(name='ferocity', :masteries='masteries')
    mastery-tree(name='cunning', :masteries='masteries')
</template>

<script>
  import MasteryTree from './MasteryTree.vue';

  export default {
    name: 'MasteryPage',

    props: ['masteries'],

    components: {
      MasteryTree,
    },
  };
</script>

<style lang="scss">
</style>

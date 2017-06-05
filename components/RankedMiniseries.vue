<template lang="pug">
  .RankedMiniseries.d-flex.justify-content-around
    template(v-for='letter in letters')
      v-icon.text-victory(v-if="letter === 'W'") check
      v-icon.text-defeat(v-else-if="letter === 'L'") close
      v-icon.text-secondary(v-else='') remove
</template>

<script>
  export default {
    name: 'RankedMiniseries',

    props: ['progress'],

    computed: {
      letters() {
        const progressLetters = [];

        for (let i = 0; i < this.progress.length; i += 1) {
          progressLetters.push(this.progress[i]);
        }

        return progressLetters;
      },
    },
  };
</script>

<style lang="stylus">
  .RankedMiniseries
    &> i
      font-size: 1.3em !important
      width: 1em !important
      min-width: 1em !important
      height: 1em !important
      min-height: 1em !important
</style>

<template lang="pug">
  .TeamHeader(:class='teamClass')
    b {{ teamName }}
</template>

<script>
  export default {
    name: 'TeamHeader',

    props: ['teamId'],

    computed: {
      teamName() {
        if (this.teamId === 100) {
          return this.$t('blueTeam');
        }

        return this.$t('redTeam');
      },

      teamClass() {
        if (this.teamId === 100) {
          return 'blue';
        }

        return 'red';
      },
    },
  };
</script>

<style lang="stylus" scoped>
  .TeamHeader
    margin-top: 1em
    color: white
    padding: 0.10em 1em

    &.blue
      background-color: #5C6BC0
    &.red
      background-color: #D32F2F
</style>

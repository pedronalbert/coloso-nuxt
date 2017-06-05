<template lang="pug">
  div
    games-recent-row(v-for='game in games', :game='game', :key='game.id')
</template>

<script>
  import GamesRecentRow from './GamesRecentRow.vue';

  export default {
    name: 'GamesRecent',

    props: ['games'],

    components: {
      GamesRecentRow,
    },
  };
</script>

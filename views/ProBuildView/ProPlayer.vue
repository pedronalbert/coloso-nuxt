<template lang="pug">
.ProPlayer
  div
    pro-player-avatar.ProPlayerAvatar-lg.mx-auto.mb-4(:image-url='player.imageUrl', :role='player.role')
  div.row.mb-4
    div.col-4
      .bold-text Nick
    div.col-8
      nuxt-link(:to="`/summoners/${player.summonerId}`") {{ player.name }}
  div.row.mb-3
    div.col-4
      .bold-text {{ $t('name') }}
    div.col-8
      .text-secondary {{ player.realName }}
</template>

<script>
  import { ProPlayerAvatar } from '../../components';

  export default {
    name: 'ProPlayer',

    props: {
      player: Object,
    },

    computed: {
      rol() {
        return this.player.role;
      },
    },

    components: {
      ProPlayerAvatar,
    },
  };
</script>

<style lang="stylus" scoped>
  .ProPlayer
    .dataTable
      font-size: 0.9em
      margin-bottom: 0px

      th
        width: 80px
</style>

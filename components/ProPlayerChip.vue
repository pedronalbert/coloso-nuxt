<template lang="pug">
  .ProPlayerChip
    div
      pro-player-avatar(:image-url='imageUrl', :role='role')
    .dataContainer
      .name.text-primary {{name}}
      .realName.text-secondary {{realName}}
</template>

<script>
  import ProPlayerAvatar from './ProPlayerAvatar.vue';

  export default {
    name: 'ProPlayerChip',

    props: ['imageUrl', 'name', 'realName', 'role'],

    components: {
      ProPlayerAvatar,
    },
  };
</script>

<style lang="stylus">
  .ProPlayerChip
    display: flex
    align-items: center

    .dataContainer
      flex: 1
      display: flex
      justify-content: center
      flex-direction: column
      overflow: hidden
      margin-left: 12px

      .name,
      .realName
        white-space: nowrap
        text-overflow: ellipsis
        overflow: hidden

      .realName
        font-size: 12px
</style>

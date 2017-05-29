<template lang="pug">
  img.MapImage(:src='imageUrl')
</template>

<script>
  export default {
    name: 'MapImage',

    props: ['mapId'],

    computed: {
      imageUrl() {
        let mapName = 'summoners_rift';

        if ([4, 10].includes(this.mapId)) {
          mapName = 'twisted_treeline';
        } else if ([3, 12, 14].includes(this.mapId)) {
          mapName = 'howling_abyss';
        } else if (this.mapId === 8) {
          mapName = 'crystal_scar';
        } else if (this.mapId === 16) {
          mapName = 'cosmic_ruins';
        }

        return `//static.coloso.net/images/maps/${mapName}.jpg`;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .MapImage {
    width: 6em;
    height: 6em;
  }
</style>

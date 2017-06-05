<template lang="pug">
  img.ChampionSkillImage(:src='imageUrl')
</template>

<script>
  export default {
    name: 'ChampionSkillImage',

    props: ['championId', 'skillId'],

    computed: {
      imageUrl() {
        return `//static.coloso.net/images/champions_skills/${this.championId}_${this.skillId}.jpg`;
      },
    },
  };
</script>

<style lang="stylus">
  .ChampionSkillImage
    width: 100%
</style>

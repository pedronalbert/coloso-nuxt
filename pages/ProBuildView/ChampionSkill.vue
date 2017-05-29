<template lang="pug">
  .ChampionSkill
    .imageContainer
      champion-skill-image(:champion-id='championId', :skill-id='skillId')
    span.skillLetter {{ skillLetter }}
    span.priority {{ skillPriority }}º
</template>

<script>
  import { ChampionSkillImage } from '../../components';

  export default {
    name: 'ChampionSkill',

    props: ['championId', 'skillId', 'skillPriority'],

    computed: {
      skillLetter() {
        const letters = [null, 'Q', 'W', 'E', 'R'];

        return letters[this.skillId];
      },
    },

    components: {
      ChampionSkillImage,
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/colors';

  .ChampionSkill {
    position: relative;

    .skillLetter {
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      left: 50%;
      font-size: 1.25em;
      color: white;
      text-shadow: 0px 0px 2px black;
    }

    .priority {
      $size: 1.8em;

      position: absolute;
      background-color: $color-accent;
      color: white;
      border-radius: 50%;
      width: $size;
      height: $size;
      text-align: center;
      line-height: $size;
      font-size: 0.7em;
      font-weight: bold;
      bottom: 0;
      right: -0.4em;
    }

    .imageContainer {
      width: 3em;
      height: 3em;
      border: 4px solid $color-primary;
      border-radius: 50%;
      overflow: hidden;
    }
  }
</style>

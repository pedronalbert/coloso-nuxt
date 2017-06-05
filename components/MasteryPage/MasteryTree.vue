<template lang="pug">
  .MasteryTree(:class='name')
    .masteriesRow(v-for='masteriesRow in masteriesMatrix')
      .masteryContainer(v-for='mastery in masteriesRow')
        mastery-image.masteryImage(:class='{ rounded: masteriesRow.length === 3, active: mastery.rank > 0 }', :mastery-id='mastery.id', :disabled='mastery.rank == undefined')
        .count(v-if='mastery.rank > 1') {{ mastery.rank }}
</template>

<script>
  import { assign, find } from 'lodash';
  import MasteryImage from '../MasteryImage.vue';

  const FEROCITY_MATRIX = [
    [6111, 6114],
    [6121, 6122, 6123],
    [6131, 6134],
    [6141, 6142, 6143],
    [6151, 6154],
    [6161, 6162, 6164],
  ];

  const RESOLVE_MATRIX = [
    [6211, 6212],
    [6221, 6222, 6223],
    [6231, 6232],
    [6241, 6242, 6243],
    [6251, 6252],
    [6261, 6262, 6263],
  ];

  const CUNNING_MATRIX = [
    [6311, 6312],
    [6321, 6322, 6323],
    [6331, 6332],
    [6341, 6342, 6343],
    [6351, 6352],
    [6361, 6362, 6363],
  ];

  function getBackbone(name) {
    if (name === 'ferocity') {
      return FEROCITY_MATRIX;
    } else if (name === 'resolve') {
      return RESOLVE_MATRIX;
    }

    return CUNNING_MATRIX;
  }

  export default {
    name: 'MasteryTree',

    props: ['name', 'masteries'],

    computed: {
      masteriesMatrix() {
        const matrix = [];
        const backboneMatrix = getBackbone(this.name);

        backboneMatrix.forEach((backboneRow) => {
          const masteriesRow = [];

          backboneRow.forEach((masteryId) => {
            const masteryData = { id: masteryId };
            assign(masteryData, find(this.masteries, { masteryId }));
            assign(masteryData, find(this.masteries, { id: masteryId }));

            masteriesRow.push(masteryData);
          });

          matrix.push(masteriesRow);
        });

        return matrix;
      },

    },

    components: {
      MasteryImage,
    },
  };
</script>

<style lang="stylus" scoped>
  @require '../../assets/stylus/colors'

  .MasteryTree
    padding: 1em
    background-color: red
    width: 13em
    border-radius: 0.5em
    margin-bottom: 1em
    margin-right: 0.5em

    &.ferocity
      background-color: rgba(255,0,0,0.2)
      border: 0.25em solid red


    &.resolve
      background-color: rgba(0,255,0,0.2)
      border: 0.25em solid green


    &.cunning
      background-color: rgba(0,0,255,0.2)
      border: 0.25em solid blue


    .masteriesRow
      display: flex
      justify-content: space-around
      margin-bottom: 0.5em

      .masteryContainer
        position: relative

        .masteryImage
          width: 3em
          height: 3em
          border-radius: 0.25em
          border: 3px solid black

          &.rounded
            border-radius: 50%

          &.active
            border-color: colors.accent

        .count
          width: 1em
          line-height: 1.2em
          font-size: 0.8em
          color: white
          background-color: black
          position: absolute
          right: 0
          bottom: 0
          text-align: center
</style>

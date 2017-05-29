<template lang="pug">
.SkillsOrder
  .skillsCol
    champion-skill(:champion-id='championId', :skill-id='1', :skill-priority='skillsPriorities[1]')
    champion-skill(:champion-id='championId', :skill-id='2', :skill-priority='skillsPriorities[2]')
    champion-skill(:champion-id='championId', :skill-id='3', :skill-priority='skillsPriorities[3]')
    champion-skill(:champion-id='championId', :skill-id='4', :skill-priority='skillsPriorities[4]')
  .timelinesCol
    skill-timeline(:timeline='skillsTimelines[1]')
    skill-timeline(:timeline='skillsTimelines[2]')
    skill-timeline(:timeline='skillsTimelines[3]')
    skill-timeline(:timeline='skillsTimelines[4]')
</template>

<script>
  import { each, orderBy, filter } from 'lodash';

  import ChampionSkill from './ChampionSkill.vue';
  import SkillTimeline from './SkillTimeline.vue';

  export default {
    name: 'SkillsOrder',

    props: ['championId', 'skills'],

    computed: {
      skillsTimelines() {
        const timelines = {
          1: [],
          2: [],
          3: [],
          4: [],
        };

        let actualLevel = 1;

        each(this.skills, ({ levelUpType, skillSlot }) => {
          each(timelines, (timeline, key) => {
            if (parseInt(key, 10) !== skillSlot) {
              timeline.push(null);
            }
          });

          timelines[skillSlot].push({
            skillId: skillSlot,
            levelUpType,
            championLevel: actualLevel,
          });

          if (levelUpType === 'NORMAL') {
            actualLevel += 1;
          }
        });


        return timelines;
      },

      skillsPriorities() {
        const skillsPriorities = {
          1: null,
          2: null,
          3: null,
          4: 4,
        };

        const skillsCount = [
          { skillSlot: 1, count: 0, published: false },
          { skillSlot: 2, count: 0, published: false },
          { skillSlot: 3, count: 0, published: false },
        ];

        let actualPriority = 1;

        this.skills.forEach(({ levelUpType, skillSlot }) => {
          if (levelUpType === 'NORMAL' && skillSlot < 4) {
            skillsCount[skillSlot - 1].count += 1;

            if (skillsCount[skillSlot - 1].count === 5) {
              skillsPriorities[skillSlot] = actualPriority;
              skillsCount[skillSlot - 1].published = true;
              actualPriority += 1;
            }
          }
        });

        each(orderBy(filter(skillsCount, { published: false }), 'count'), ({ skillSlot }) => {
          skillsPriorities[skillSlot] = actualPriority;
          actualPriority += 1;
        });

        return skillsPriorities;
      },
    },

    components: {
      SkillTimeline,
      ChampionSkill,
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/colors';

  .SkillsOrder {
    $row-separation: 0.6em;

    display: flex;

    .skillsCol {
      padding-top: 2em;
      display: flex;
      flex-direction: column;

      .ChampionSkill {
        margin-bottom: $row-separation;
      }
    }

    .timelinesCol {
      padding-top: 2em;
      overflow-x: scroll;

      .SkillTimeline {
        margin-bottom: $row-separation;
      }
    }
  }
</style>

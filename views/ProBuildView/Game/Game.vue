<template lang="pug">
  div
    team-header.mb-4(:team-id='100', :kills='blueTeamScore.kills', :deaths='blueTeamScore.deaths', :assists='blueTeamScore.assists', :win='blueParticipants[0].stats.win')
    participant(v-for='participant, idx in blueParticipants', :key='idx', :participant='participant')
    team-header.my-4(:team-id='200', :kills='redTeamScore.kills', :deaths='redTeamScore.deaths', :assists='redTeamScore.assists', :win='redParticipants[0].stats.win')
    participant(v-for='participant, idx in redParticipants', :key='idx', :participant='participant')
</template>

<script>
  import Participant from './Participant.vue';
  import TeamHeader from './TeamHeader.vue';

  export default {
    name: 'Game',

    props: ['game'],

    computed: {
      blueParticipants() {
        return this.game.participants.filter(participant => participant.teamId === 100);
      },

      redParticipants() {
        return this.game.participants.filter(participant => participant.teamId === 200);
      },

      blueTeamScore() {
        return this.getTeamScore(this.blueParticipants);
      },

      redTeamScore() {
        return this.getTeamScore(this.redParticipants);
      },
    },

    methods: {
      getTeamScore(participants) {
        const score = {
          kills: 0,
          deaths: 0,
          assists: 0,
        };

        participants.forEach((participant) => {
          score.kills += participant.stats.kills;
          score.deaths += participant.stats.deaths;
          score.assists += participant.stats.assists;
        });

        return score;
      },
    },

    components: {
      Participant,
      TeamHeader,
    },
  };
</script>

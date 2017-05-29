<template lang="pug">
  span(:class='textClass')
    b {{ kda }}:1
</template>

<script>
  export default {
    name: 'Kda',

    props: {
      kills: {
        type: Number,
        default: 0,
      },

      deaths: {
        type: Number,
        default: 0,
      },

      assists: {
        type: Number,
        default: 0,
      },
    },

    computed: {
      kda() {
        let kda = this.kills + this.assists;

        if (this.deaths > 0) {
          kda /= this.deaths;
        }

        return kda.toFixed(2);
      },

      textClass() {
        let className = 'text-secondary';

        if (this.kda < 1) {
          className = 'text-defeat';
        } else if (this.kda >= 3) {
          className = 'text-tier-platinum';
        } else if (this.kda >= 4) {
          className = 'text-tier-diamond';
        }

        return className;
      },
    },
  };
</script>

<style lang="scss" scoped>
</style>

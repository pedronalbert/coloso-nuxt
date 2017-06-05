<template lang="pug">
  img.img-fluid(:src='imageUrl')
</template>

<script>
  export default {
    name: 'MasteryImage',

    props: {
      masteryId: {
        type: Number,
        required: true,
      },

      disabled: {
        type: Boolean,
        default: false,
      },
    },

    computed: {
      imageUrl() {
        let imgName = `${this.masteryId}`;

        if (this.disabled) {
          imgName = `gray_${this.masteryId}`;
        }

        return `//static.coloso.net/images/masteries/${imgName}.jpg`;
      },
    },
  };
</script>

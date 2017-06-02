<template lang="pug">
  footer.mt-4
    .container
      .mader.text-center.d-flex.justify-content-center.align-items-center
        | Made with
        v-icon.text-defeat.mx-2 favorite
        | by
        a.ml-2(href='https://twitter.com/pedronalbert', target='_blank') @pedronalbert
      .disclaimer.mt-2
        | Coloso isn’t endorsed by Riot Games and doesn’t reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.
      .d-flex.mt-2.miniFooter
        a.mr-3(href='https://en.coloso.net') {{ $t('langs.en') }}
        a.mr-3(href='https://es.coloso.net') {{ $t('langs.es') }}
        .u-flexer
        | © 2017 Alberto Pedron
</template>

<script>
  export default {
    name: 'AppFooter',
  };
</script>

<style lang="scss" scoped>
  @import '../assets/scss/colors';

  footer {
    background-color: $color-primary;
    color: white;
    box-shadow: 0 2px 2px rgba(0,0,0,.14);
    background-image: url('/images/background_shapes.png');
    background-size: 306px 256px;

    .container {
      padding: 0.5em;

      a {
        color: white;
        text-decoration: underline;

        &:hover { color: $color-accent }
      }

      .disclaimer {
        font-size: 0.75em;
        line-height: 12px;
      }

      .miniFooter {
        font-size: 0.8em;
      }
    }
  }
</style>

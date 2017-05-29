<template lang="pug">
  footer.mt-4
    .container
      .disclaimer
        | Coloso isn’t endorsed by Riot Games and doesn’t reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.
      .copyright
        | Copyright 2017 ©
        a(href='https://twitter.com/pedronalbert', target='_bla') @pedronalbert
</template>

<script>
  export default {
    name: 'AppFooter',
  };
</script>

<style lang="scss" scoped>
  @import '../styles/colors';

  footer {
    background-color: $color-primary;
    color: white;
    box-shadow: 0 1px 5px rgba(0,0,0,.2), 0 2px 2px rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12);
    background-image: url('//static.coloso.net/images/background_shapes.png');
    background-size: 306px 256px;

    .container {
      padding: 0.5em;

      a { color: white }

      .gp-badge {
        width: 10em;
      }

      .disclaimer {
        font-size: 11px;
        line-height: 12px;
      }

      .copyright {
        margin: 0.75em auto 0 auto;
        font-size: 0.9em;
        text-align: center;
      }
    }
  }
</style>

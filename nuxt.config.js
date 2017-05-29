const { join } = require('path');

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },

  css: [
    'material-design-icons/iconfont/material-icons.css',
    'sweetalert2/dist/sweetalert2.min.css',
    'animate.css/animate.min.css',
    'vuetify/dist/vuetify.min.css',
    join(__dirname, 'assets/scss/main.scss'),
  ],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#FF5722' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLINT on save
    */
    extend(config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
    },

    babel: {
      presets: ['stage-2'],
    },

    vendor: ['vue-i18n', 'jquery', 'axios', 'moment', 'numeral'],
  },

  plugins: [
    { src: '~plugins/i18n.js', injectAs: 'i18n' },
    { src: '~plugins/filters.js' },
    { src: '~plugins/Vuetify.js' },
    { src: '~plugins/SweetAlert.js', ssr: false },
  ],

  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'Home',
        path: '/',
        component: resolve(__dirname, 'pages/HomeView/HomeView.vue'),
      }, {
        name: 'ProBuild',
        path: '/pro-builds/:buildId',
        component: resolve(__dirname, 'pages/ProBuildView/ProBuildView.vue'),
      }, {
        name: 'SummonerProfile',
        path: '/summoners/:summonerId',
        component: resolve(__dirname, 'pages/SummonerProfileView/SummonerProfileView.vue'),
      }, {
        name: 'ProBuildsList',
        path: '/pro-builds',
        component: resolve(__dirname, 'pages/ProBuildsListView/ProBuildsListView.vue'),
      }, {
        name: 'GameCurrent',
        path: '/game-current/:summonerId',
        component: resolve(__dirname, 'pages/GameCurrentView/GameCurrentView.vue'),
      });
    },
  },
};

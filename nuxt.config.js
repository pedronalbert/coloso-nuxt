const webpack = require('webpack');

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Coloso.net - League of Legends Tools',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Coloso.net' },
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicon.png' },
      { rel: 'alternate', hreflang: 'es', href: 'https://es.coloso.net' },
      { rel: 'alternate', hreflang: 'en', href: 'https://en.coloso.net' },
      { rel: 'alternate', hreflang: 'x-default', href: 'https://www.coloso.net' },
    ],
    script: [
      { src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js', async: 'async' },
    ],
  },

  css: [
    'material-design-icons/iconfont/material-icons.css',
    'sweetalert2/dist/sweetalert2.css',
    'animate.css/animate.css',
    'vuetify/dist/vuetify.min.css',
    { src: '~assets/scss/main.scss', lang: 'scss' },
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

    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ],

    vendor: ['vue-i18n', 'jquery', 'axios', 'moment', 'moment/locale/es', 'numeral'],
  },

  plugins: [
    { src: '~plugins/i18n.js', injectAs: 'i18n' },
    { src: '~plugins/filters.js' },
    { src: '~plugins/Vuetify.js' },
    { src: '~plugins/SweetAlert.js', ssr: false },
    { src: '~plugins/ga.js', ssr: false },
  ],

  router: {
    middleware: 'i18n',
  },
};

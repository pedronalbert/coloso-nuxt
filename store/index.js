import Vue from 'vue';
import Vuex from 'vuex';

import modules from './modules';
import entitiesPlugin from './plugins/entitiesPlugin';

Vue.use(Vuex);

export default () => new Vuex.Store({
  state: {
    locales: ['en', 'es'],
    locale: 'en',
  },

  modules,

  plugins: [entitiesPlugin],

  mutations: {
    setLocale(state, locale) {
      if (state.locales.includes(locale)) {
        /* eslint-disable no-param-reassign */
        state.locale = locale;
      }
    },
  },
});

import Vue from 'vue';
import VueI18n from 'vue-i18n';

import translations from '../translations';


// TODO: set locale
Vue.use(VueI18n);


/* eslint-disable */
export default ({ app, route, error }) => {
  app.i18n = new VueI18n({
    locale: 'en',
    messages: translations,
  });
};

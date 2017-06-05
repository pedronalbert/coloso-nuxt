import Vue from 'vue';
import VueI18n from 'vue-i18n';

import translations from '../translations';

Vue.use(VueI18n);

/* eslint-disable no-param-reassign */
export default ({ app, store }) => {
  app.i18n = new VueI18n({
    locale: store.state.locale,
    messages: translations,
  });


  if (process.BROWSER_BUILD) {
    window.i18n = app.i18n;
  } else {
    global.i18n = app.i18n;
  }
};

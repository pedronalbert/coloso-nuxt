import moment from 'moment';
import langParser from 'accept-language-parser';
import ColosoClient from '../utils/ColosoClient';

function getDomainLocale(hostname) {
  const subdomainRegexLocale = /^[a-z]{2}\./g;
  const matches = hostname.match(subdomainRegexLocale);

  if (matches !== null) {
    return matches[0].slice(0, 2);
  }

  return null;
}

export default ({ app, req, isServer, store }) => {
  if (isServer) {
    const domainlocale = getDomainLocale(req.headers.host);

    if (domainlocale !== null) {
      store.commit('setLocale', domainlocale);
    } else {
      const langs = langParser.parse(req.headers['accept-language']);

      if (langs.length > 0) {
        store.commit('setLocale', langs[0].code);
      }
    }
  }

  /* eslint-disable no-param-reassign */
  app.i18n.locale = store.state.locale;
  moment.locale(store.state.locale);
  ColosoClient.defaults.headers.common['Accept-Language'] = store.state.locale;
};

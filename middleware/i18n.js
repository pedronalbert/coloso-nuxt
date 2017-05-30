import moment from 'moment';
import ColosoClient from '../utils/ColosoClient';

function getDomainLocale(hostname) {
  const subdomainRegexLocale = /^[a-z]{2}/;
  const matches = hostname.match(subdomainRegexLocale);

  if (matches.length > 0) {
    return matches[0];
  }

  return null;
}

export default ({ app, req, isServer, store }) => {
  if (isServer) {
    const domainlocale = getDomainLocale(req.headers.host);

    if (domainlocale !== null) {
      store.commit('setLocale', domainlocale);
    } else {
      const reqLocale = req.headers['accept-language'].slice(0, 2).toLowerCase();

      store.commit('setLocale', reqLocale);
    }

    /* eslint-disable no-param-reassign */
    ColosoClient.defaults.headers.common['Accept-Language'] = store.state.locale;
    moment.lang(store.state.locale);
    app.i18n.locale = store.state.locale;
  }
};

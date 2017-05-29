// const AVAILABLE_LOCALES = ['en', 'es'];
const DEFAULT_LOCALE = 'en';

export default function () {
  // const navigatorLocale = window.location.hostname.slice(0, 2);
  //
  // if (AVAILABLE_LOCALES.includes(navigatorLocale.toLowerCase())) {
  //   return navigatorLocale;
  // }

  return DEFAULT_LOCALE;
}

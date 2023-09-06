/**
 * All the locales available in the app.
 */
export const supportedLocales = {
  en: { label: 'English' },
  ja: { label: '日本語' },
};

export const formatDate = (date, locale) =>
  new Date(date).toLocaleDateString(locale, { timeZone: 'Asia/Tokyo' });

import { supportedLocales } from '$lib/services/i18n.js';

// Set the `lang` attribute on `<html>`
// https://github.com/sveltejs/kit/issues/3091
export function handle({ event, resolve }) {
  const { pathname } = event.url;

  const [, lang = 'en'] =
    pathname.match(new RegExp(`^\\/(${Object.keys(supportedLocales).join('|')})\\b`)) || [];

  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace('%lang%', lang),
  });
}

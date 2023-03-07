export const allPages = {};

const files = import.meta.glob('../../data/pages/*.json', { as: 'raw', eager: true });

Object.entries(files).forEach(([path, rawFile]) => {
  const content = JSON.parse(rawFile);
  const [, slug] = path.match(/\/([^/]+)\.json$/);

  Object.entries(content).forEach(([locale, page]) => {
    allPages[locale] ||= {};

    allPages[locale][slug] = {
      _slug: slug,
      _path: `/${locale}/${slug}`,
      ...page,
    };
  });
});

export const allNews = {};

const files = import.meta.glob('../../data/news/*.json', { as: 'raw', eager: true });

Object.entries(files).forEach(([path, rawFile]) => {
  const [, slug] = path.match(/.+?\/(\w+?)\.\w+$/);
  const content = JSON.parse(rawFile);

  Object.entries(content).forEach(([locale, item]) => {
    allNews[locale] ||= [];

    if (item.hidden) {
      return;
    }

    allNews[locale][slug] = item;
  });
});

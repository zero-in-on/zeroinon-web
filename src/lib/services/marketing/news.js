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

// Sort by name and sort key
Object.entries(allNews).forEach(([locale, items]) => {
  const now = Date.now();

  allNews[locale] = Object.fromEntries(
    Object.entries(items)
      .sort((a, b) => new Date(b[1].date || now).getTime() - new Date(a[1].date || now).getTime())
      .sort((a, b) => (b[1].sortKey || 0) - (a[1].sortKey || 0)),
  );
});

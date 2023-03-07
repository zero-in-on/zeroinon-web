export const allProjects = {};

const files = import.meta.glob('../../data/projects/*.json', { as: 'raw', eager: true });

Object.entries(files).forEach(([path, rawFile]) => {
  const [, slug] = path.match(/.+?\/(\w+?)\.\w+$/);
  const content = JSON.parse(rawFile);

  Object.entries(content).forEach(([locale, item]) => {
    allProjects[locale] ||= [];

    allProjects[locale][slug] = item;
  });
});

// Sort by name and sort key
Object.entries(allProjects).forEach(([locale, items]) => {
  allProjects[locale] = Object.fromEntries(
    Object.entries(items)
      .sort((a, b) => (a[1].name || '').localeCompare(b[1].name || ''))
      .sort((a, b) => (b[1].sortKey || 0) - (a[1].sortKey || 0)),
  );
});

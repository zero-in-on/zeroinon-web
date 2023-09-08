import { allNews } from '$lib/services/marketing/news';

export function match(param) {
  return Object.keys(allNews.ja).includes(param);
}

import { allNews } from '$lib/services/marketing/news';

export function match(param) {
  return Object.keys(allNews).includes(param);
}

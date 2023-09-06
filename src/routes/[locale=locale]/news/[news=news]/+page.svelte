<script>
  import { page } from '$app/stores';
  import { allNews } from '$lib/services/marketing/news';
  import { allPages } from '$lib/services/marketing/pages';

  $: ({ locale = 'ja' } = $page.params);
  $: strings = allPages?.[locale]?.news;
  $: ({ title, date, cover, body } = allNews[locale][slug] || {});
</script>

<h1>{title}</h1>

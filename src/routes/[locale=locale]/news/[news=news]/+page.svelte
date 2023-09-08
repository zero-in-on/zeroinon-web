<script>
  import { page } from '$app/stores';
  import { formatDate } from '$lib/services/i18n';
  import { allNews } from '$lib/services/marketing/news';
  import { allPages } from '$lib/services/marketing/pages';
  import { marked } from 'marked';

  $: ({ locale = 'ja', news: slug } = $page.params);
  $: strings = allPages?.[locale]?.news;
  $: ({ title, date, cover, body, link } = allNews[locale][slug] || {});
</script>

<section id="first" class="main">
  <header>
    <div class="container medium">
      <h1>{title}</h1>
      {#if cover}
        <img src={cover} alt="" class="cover" />
      {/if}
      <section>
        <p>{formatDate(date, locale)}</p>
        {@html marked.parse(body || '')}
        {#if link}
          <p class="link"><a href={link}>{link}</a></p>
        {/if}
      </section>
    </div>
  </header>
</section>

<style lang="scss">
  .cover {
    width: 100%;
  }

  .link {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>

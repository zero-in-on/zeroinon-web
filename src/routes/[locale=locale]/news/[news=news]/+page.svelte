<script>
  import { marked } from 'marked';
  import { onDestroy } from 'svelte';
  import { page } from '$app/stores';
  import { formatDate } from '$lib/services/i18n';
  import { allNews } from '$lib/services/marketing/news';
  import { allPages } from '$lib/services/marketing/pages';

  let parseBody = '';
  let timeoutId;

  $: ({ locale = 'ja', news: slug } = $page.params);
  $: strings = allPages?.[locale]?.news;
  $: ({ title, date, cover, body, link } = allNews[locale][slug] || {});

  $: if (body) {
    const renderer = new marked.Renderer();

    renderer.image = (href, text, imgtitle) =>
      `<figure class="image-container"> <img src="${href}" alt="${text}" class="img-src" /> ${
        title ? `<figcaption>${imgtitle}</figcaption>` : ''
      } </figure>`;

    parseBody = marked(body, { renderer });
    console.log('parseBody updated', parseBody);
  }

  // コンポーネントが破棄されたときにクリーンアップ
  onDestroy(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  });
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
        {@html parseBody}
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

  :global(.image-container) {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1em 0;
  }

  :global(.img-src) {
    display: block;
    max-width: 100%;
    height: auto;
  }

  :global(figcaption) {
    font-size: 0.9em;
    color: #555;
    margin-top: 0.5em;
    text-align: center;
  }

  .link {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>

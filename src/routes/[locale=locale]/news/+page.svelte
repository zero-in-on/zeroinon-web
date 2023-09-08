<script>
  import { page } from '$app/stores';
  import GridItem from '$lib/components/grid-item.svelte';
  import Grid from '$lib/components/grid.svelte';
  import { formatDate } from '$lib/services/i18n';
  import { allNews } from '$lib/services/marketing/news';
  import { allPages } from '$lib/services/marketing/pages';

  $: ({ locale = 'ja' } = $page.params);
  $: strings = allPages?.[locale]?.news;
  $: news = allNews?.[locale];
</script>

<svelte:head>
  {#if strings?.meta?.pageTitle}
    <title>
      {strings?.meta?.heading} | {allPages?.[locale]?._strings?.globalMeta?.siteName || ''}
    </title>
  {/if}
</svelte:head>

<section id="first" class="main">
  <div class="container">
    <div class="row">
      <div class="col-12">
        <header>
          <h3>{strings?.meta?.heading || ''}</h3>
        </header>
      </div>
      <div class="col-12">
        <Grid --grid-item-size="320px">
          {#each Object.entries(allNews[locale]).sort((a, b) => new Date(b[1].date).getTime() - new Date(a[1].date).getTime()) as [slug, { title, date, cover }] (slug)}
            <GridItem
              link="/{locale}/news/{slug}"
              image={cover}
              {title}
              summary={formatDate(date, locale)}
            />
          {/each}
        </Grid>
      </div>
    </div>
  </div>
</section>

<style lang="scss">
  .main {
    :global(p) {
      margin: 1.5em 0 0;
    }
  }
</style>

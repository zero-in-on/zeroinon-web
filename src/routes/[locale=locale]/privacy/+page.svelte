<script>
  import { marked } from 'marked';
  import { page } from '$app/stores';
  import { allPages } from '$lib/services/marketing/pages';

  $: ({ locale = 'ja' } = $page.params);
  $: strings = allPages?.[locale]?.privacy;
</script>

<!-- First -->
<section id="first" class="main">
  <header>
    <div class="container">
      <div class="row">
        <div class="col-12 col-12-narrow">
          <h2>{strings?.policy?.heading || ''}</h2>
          <div class="body">
            {@html marked.parse(strings?.policy?.body || '')}
          </div>
        </div>
      </div>
    </div>
  </header>
</section>

<style lang="scss">
  .body {
    & > :global(*) {
      margin: 1.5em 0 0;
    }

    :global(a) {
      color: #c24412;
    }
  }
</style>

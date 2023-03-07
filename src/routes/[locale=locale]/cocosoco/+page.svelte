<script>
  import { marked } from 'marked';
  import { page } from '$app/stores';
  import { allPages } from '$lib/services/marketing/pages';

  $: ({ locale = 'ja' } = $page.params);
  $: strings = allPages?.[locale]?.cocosoco;
</script>

<!-- First -->
<section id="first" class="main">
  <header>
    <div class="container">
      <div class="row">
        <div class="col-6 col-12-narrow">
          <h3>{@html strings?.overview?.heading || ''}</h3>
          {@html marked.parse(strings?.overview?.body || '')}
          <br />
          <br />
          <p>
            <img
              src={strings?.overview?.image1?.url || ''}
              alt={strings?.overview?.image1?.label || ''}
              width="60%"
              style="display:block; margin:auto;"
            />
          </p>
        </div>
        <div class="col-6 col-12-narrow">
          <br />
          <br />
          <section id="video">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/{strings?.overview?.video?.id || ''}"
              title={strings?.overview?.video?.label || 'YouTube video player'}
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            />
          </section>
          <img
            src={strings?.overview?.image2?.url || ''}
            alt={strings?.overview?.image2?.label || ''}
            width="100%"
          />
        </div>
      </div>
    </div>
  </header>

  <div class="content dark style1 featured">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <header>
            <h3>{strings?.features?.heading || ''}</h3>
          </header>
        </div>
        {#each strings?.features?.features || [] as { image, name, description } (name)}
          <div class="col-3 col-12-narrow">
            <section>
              <span class="feature-icon"><img src={image} width="100%" alt="" /></span>
              <header>
                <h3>{name}</h3>
              </header>
              <p>{description}</p>
            </section>
          </div>
        {/each}
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

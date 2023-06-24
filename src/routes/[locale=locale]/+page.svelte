<script>
  import { page } from '$app/stores';
  import { allPages } from '$lib/services/marketing/pages';
  import { allProjects } from '$lib/services/marketing/projects';
  import { marked } from 'marked';

  $: ({ locale = 'ja' } = $page.params);
  $: strings = allPages?.[locale]?.home;
</script>

<!-- Header -->
<section id="header" class="dark">
  <h1>
    <strong>{strings?.hero?.heading1 || ''}</strong>
    {#if strings?.hero?.heading2}
      <br />
      <strong>{strings?.hero?.heading2}</strong>
    {/if}
  </h1>
</section>

<!-- First -->
<section class="main">
  <header id="intro">
    <div class="container">
      {@html marked.parse(strings?.hero?.description || '')}
    </div>
  </header>
  <div id="works" class="content dark style5 featured">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <header>
            <h3>{strings?.projects?.heading || ''}</h3>
          </header>
        </div>
        {#each Object.entries(allProjects[locale]) || [] as [slug, { name, image, description, link }] (slug)}
          <div class="col-4 col-12-narrow">
            <section>
              <span class="feature-icon">
                <a href={link.url}><img src={image} alt={name} width="100%" /></a>
              </span>
              <header>
                <h3>{name}</h3>
              </header>
              {@html marked.parse(description || '')}
              <ul class="actions special">
                <li><a href={link.url} class="button">{link.label}</a></li>
              </ul>
            </section>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

<!-- Second -->
<section id="news" class="main">
  <header>
    <div class="container">
      <h2>{strings?.news?.heading || ''}</h2>
      {@html marked.parse(strings?.news?.description || '')}
      <br />
      <center>
        <div
          class="fb-page"
          data-href={strings?.news?.link?.url || ''}
          data-tabs="timeline"
          data-width="500"
          data-height="380"
          data-small-header="false"
          data-adapt-container-width="true"
          data-hide-cover="false"
          data-show-facepile="false"
        >
          <blockquote cite={strings?.news?.link?.url || ''} class="fb-xfbml-parse-ignore">
            <a href={strings?.news?.link?.url || ''}>{strings?.news?.link?.label || ''}</a>
          </blockquote>
        </div>
      </center>
      <div id="fb-root" />
      <script
        async
        defer
        crossorigin="anonymous"
        src="https://connect.facebook.net/ja_JP/sdk.js#xfbml=1&version=v17.0"
        nonce="9yTXnBhy"
      >
      </script>
    </div>
  </header>
</section>

<!-- Fourth -->
<section id="contact" class="main">
  <div class="content dark style1 featured">
    <header>
      <div class="container">
        <h3>{strings?.contact?.heading || ''}</h3>
        {@html marked.parse(strings?.contact?.description || '')}
      </div>
    </header>
    <div class="container medium">
      <script
        src="https://www.google.com/recaptcha/api.js?render=6LcGF5EiAAAAAFlSW6JGEMCsPeUAX_SxPAueK1N1"
      >
      </script>
      <script>
        grecaptcha.ready(function () {
          grecaptcha
            // cSpell:disable-next-line
            .execute('6LcGF5EiAAAAAFlSW6JGEMCsPeUAX_SxPAueK1N1', {
              action: 'submit',
            })
            .then(function (token) {
              var recaptchaResponse = document.getElementById('g-recaptcha-response');
              recaptchaResponse.value = token;
            });
        });
      </script>
      <form
        method="post"
        action="https://script.google.com/macros/s/AKfycbzN2frzN-ChTZlPb7MYvayvGALLLuMmmS1nFJEM83fVP6yp9lR5Mr56V-13BEwcdBoMNg/exec"
      >
        <div class="row gtr-50">
          <div class="col-6 col-12-mobile">
            <input type="text" name="name" placeholder={strings?.contact?.form?.name || ''} />
          </div>
          <div class="col-6 col-12-mobile">
            <input type="text" name="email" placeholder={strings?.contact?.form?.email || ''} />
          </div>
          <div class="col-12">
            <textarea name="message" placeholder={strings?.contact?.form?.message || ''} />
          </div>
          <div class="col-12">
            <ul class="actions special">
              <li><input type="hidden" name="recaptcha" id="g-recaptcha-response" /></li>
              <li>
                <input type="submit" class="button" value={strings?.contact?.form?.send || ''} />
              </li>
              <li>
                <input
                  type="reset"
                  class="button alt"
                  value={strings?.contact?.form?.clear || ''}
                />
              </li>
            </ul>
          </div>
        </div>
      </form>
    </div>
  </div>
</section>

<style lang="scss">
  #intro {
    :global(p:not(:first-child)) {
      margin-top: 1.5em;
    }
  }
</style>

<script>
  import { marked } from 'marked';
  import { page } from '$app/stores';
  import { formatDate } from '$lib/services/i18n';
  import { allNews } from '$lib/services/marketing/news';
  import { allPages } from '$lib/services/marketing/pages';
  import { allProjects } from '$lib/services/marketing/projects';

  $: ({ locale = 'ja' } = $page.params);
  $: strings = allPages?.[locale]?.home;
  $: links = allPages?.[locale]?._strings;
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
  <section class="container news">
    <h2>{strings?.news?.heading || ''}</h2>
    {#each Object.entries(allNews[locale])
      .sort((a, b) => new Date(b[1].date).getTime() - new Date(a[1].date).getTime())
      .slice(0, 3) as [slug, { title, date, cover }] (slug)}
      <section>
        <header>
          <p><time datetime={date}>{formatDate(date, locale)}</time></p>
          <h3><a href="/{locale}/news/{slug}">{title}</a></h3>
        </header>
      </section>
    {/each}

    <h3><a href={links?.toNews?.url}>{links?.toNews?.heading}</a></h3>
  </section>

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
                <a href={link.url}
                  ><img src={image} alt={name} class="rounded-image" width="100%" /></a
                >
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

  .news {
    section {
      margin: 16px 0;
    }
    h2 {
      text-align: center;
      margin: 10px;
      font-size: 24px;
      font-weight: bold;
      line-height: 1.75;
    }

    h3 {
      font-size: 16px;
      font-weight: normal;
      line-height: 1.75;
    }

    p {
      margin: 0;
      color: #171717;
      font-size: 14px;
    }
  }

  .rounded-image {
    border-radius: 20px;
  }
</style>

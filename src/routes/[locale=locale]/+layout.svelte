<script>
  import { page } from '$app/stores';
  import { supportedLocales } from '$lib/services/i18n';
  import { allPages } from '$lib/services/marketing/pages';

  $: ({ locale = 'ja' } = $page.params);
  $: strings = allPages?.[locale]?._strings;
</script>

<svelte:head>
  <title>{strings?.globalMeta?.siteName || ''}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
  <link rel="stylesheet" href="/assets/css/main.css" />
  <link rel="stylesheet" href="/assets/css/styleset.css" />
  <link rel="icon" href="/images/favicon.svg" type="any" />
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
  />

  <!-- Scripts -->

  <!-- Scripts -->
  <script src="/assets/js/jquery.min.js"></script>
  <script src="/assets/js/jquery.scrolly.min.js"></script>
  <script src="/assets/js/browser.min.js"></script>
  <script src="/assets/js/breakpoints.min.js"></script>
  <script src="/assets/js/util.js"></script>
  <script src="/assets/js/main.js"></script>

  <!-- Google tag (gtag.js) -->

  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-V3LZ3GEM8Z"></script>
  <script>
    window.dataLayer = window.dataLayer || [];

    function gtag() {
      dataLayer.push(arguments);
    }

    gtag('js', new Date());
    gtag('config', 'G-V3LZ3GEM8Z');
  </script>
</svelte:head>

<!-- Navigation Header-->
<header id="nav-header">
  <a href="/{locale}">
    <img
      src={strings?.globalMeta?.siteLogo || ''}
      alt={strings?.globalMeta?.siteName || ''}
      class="style"
    />
  </a>
  <div class="nav" id="myTopnav">
    <ul>
      {#each strings?.header?.links || [] as { url, label }, index (url)}
        <li>
          {#if index === 0 && url.startsWith(`/${locale}`) && $page.url.pathname !== `/${locale}`}
            <a href="/{locale}">{strings?.header?.backToHome?.label || ''}</a>
          {:else}
            <a href={url}>{label}</a>
          {/if}
        </li>
      {/each}
      {#each Object.entries(supportedLocales) as [_locale, { label }] (_locale)}
        {#if _locale !== locale}
          <li>
            <a href={$page.url.pathname.replace(new RegExp(`^\\/${locale}`), `/${_locale}`)}>
              <span class="language">{label}</span>
            </a>
          </li>
        {/if}
      {/each}
    </ul>
    <!-- svelte-ignore a11y-invalid-attribute -->
    <a href="javascript:void(0);" class="icon" onclick="myFunction()">
      <i class="fa fa-bars fa-2x" />
    </a>
  </div>
</header>

<slot />

<!-- Footer -->
<section id="footer">
  <ul class="icons">
    {#each strings?.SNS?.links || [] as { url, label } (url)}
      <li>
        <a href={url} class="icon brands fa-facebook-f"><span class="label">Facebook </span></a>
      </li>
    {/each}
  </ul>
  <div class="copyright">
    <ul class="menu">
      <li>{strings?.globalMeta?.copyright || ''}</li>
      {#each strings?.footer?.links || [] as { url, label } (url)}
        <li><a href={url}>{label}</a></li>
      {/each}
    </ul>
  </div>
</section>

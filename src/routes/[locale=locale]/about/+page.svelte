<script>
  import { marked } from 'marked';
  import { page } from '$app/stores';
  import { allMembers } from '$lib/services/marketing/members';
  import { allPages } from '$lib/services/marketing/pages';

  $: ({ locale = 'ja' } = $page.params);
  $: strings = allPages?.[locale]?.about;
</script>

<svelte:head>
  {#if strings?.meta?.pageTitle}
    <title>
      {strings?.meta?.pageTitle} | {allPages?.[locale]?._strings?.globalMeta?.siteName || ''}
    </title>
  {/if}
</svelte:head>

<!-- First -->
<section id="first" class="main">
  <header>
    <div class="container medium">
      <section id="overview">
        <h3>{strings?.overview?.heading || ''}</h3>
        <br />
        <table class="default">
          <tbody>
            <tr>
              <th>{strings?.overview?.name?.label || ''}</th>
              <td>{strings?.overview?.name?.value || ''}</td>
            </tr>
            {#if strings?.overview?.foundation?.value}
              <tr>
                <th>{strings?.overview?.foundation?.label || ''}</th>
                <td>{strings?.overview?.foundation?.value || ''}</td>
              </tr>
            {/if}
            {#if strings?.overview?.address?.value}
              <tr>
                <th>{strings?.overview?.address?.label || ''}</th>
                <td>{strings?.overview?.address?.value || ''}</td>
              </tr>
            {/if}
            {#if strings?.overview?.capital?.value}
              <tr>
                <th>{strings?.overview?.capital?.label || ''}</th>
                <td>{strings?.overview?.capital?.value || ''}</td>
              </tr>
            {/if}
            {#if strings?.overview?.contact?.value}
              <tr>
                <th>{strings?.overview?.contact?.label || ''}</th>
                <td>{strings?.overview?.contact?.value || ''}</td>
              </tr>
            {/if}
            {#if strings?.overview?.businesses?.value}
              <tr>
                <th>{strings?.overview?.businesses?.label || ''}</th>
                <td>{@html marked.parse(strings?.overview?.businesses?.value || '')}</td>
              </tr>
            {/if}
            {#if strings?.overview?.licenses?.value}
              <tr>
                <th>{strings?.overview?.licenses?.label || ''}</th>
                <td>{@html marked.parse(strings?.overview?.licenses?.value || '')}</td>
              </tr>
            {/if}
            {#if strings?.overview?.certifications?.value}
              <tr>
                <th>{strings?.overview?.certifications?.label || ''}</th>
                <td>{@html marked.parse(strings?.overview?.certifications?.value || '')}</td>
              </tr>
            {/if}
            {#if strings?.overview?.customers?.value}
              <tr>
                <th>{strings?.overview?.customers?.label || ''}</th>
                <td>{@html marked.parse(strings?.overview?.customers?.value || '')}</td>
              </tr>
            {/if}
          </tbody>
        </table>
      </section>
      <section id="members">
        <h3>{strings?.members?.heading || ''}</h3>
        {#each Object.entries(allMembers[locale]) || [] as [slug, { name, jobTitle, image, description, links = [] }], index (slug)}
          {#if index > 0}
            <hr />
          {/if}
          <div class="row">
            <div class="col-12-narrow col-12">
              <section>
                <img src={image} alt="" class="image crop" />
                <h4>{jobTitle} &nbsp; {name}</h4>
                <div class="profile">{@html marked.parse(description || '')}</div>
                {#each links as { url, label }}
                  <p><a href={url}>{label}</a></p>
                {/each}
              </section>
            </div>
          </div>
        {/each}
      </section>
    </div>
  </header>
</section>

<style lang="scss">
  #overview {
    table.default {
      :global(ul) {
        margin: 0;
        padding: 0;
        list-style-type: none;
        font-size: 0.8em;

        :global(li) {
          margin: 0.5em 0;
          padding: 0;
          line-height: 1.5;
        }
      }
    }
  }

  #members {
    img {
      float: right;
      margin: 0 0 1em 1em;
    }

    .profile {
      margin: 1em 0;
      font-size: 0.8em;
    }
  }
</style>

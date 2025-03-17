<script>
  export let link = '';
  export let image = '';
  export let title = '';
  export let summary = '';
</script>

<section>
  <a href={link}>
    <img src={image || undefined} alt="" />
    <div>
      <h3>{title}</h3>
      {#if summary}
        <p>{summary}</p>
      {/if}
    </div>
  </a>
</section>

<style lang="scss">
  section {
    aspect-ratio: 1 / 1;
    border-radius: 20px;

    a {
      position: relative;
      display: block;
      width: 100%;
      height: 100%;
      color: inherit;
      text-decoration: none;
      overflow: hidden;
      box-shadow: 0 0 8px #0003;
      border-radius: inherit;

      &:hover,
      &:focus {
        img {
          transform: scale(100%);
        }
      }
    }

    img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s;
      border-radius: inherit;

      &:not([src]) {
        background-image: linear-gradient(to bottom, #484848, #888);
      }
    }

    div {
      position: absolute;
      inset: auto 0 0;
      background: #fff9;
      padding: 16px;
      border-radius: inherit;

      h3 {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
      }

      p {
        margin: 8px 0 0;
        font-size: 14px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    }
  }
</style>

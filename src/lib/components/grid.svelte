<div class="grid">
  <slot />
</div>

<style lang="scss">
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(var(--grid-item-size, 240px), 1fr));
    gap: 32px;
    margin: 32px 0;
  }
</style>
